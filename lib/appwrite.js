import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.goulart.segueolider',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    friendsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_FRIENDS_COLLECTION_ID,
    gamesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GAMES_COLLECTION_ID,
    usersPointsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_POINTS_COLLECTION_ID,
    gameLogsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GAME_LOGS_COLLECTION_ID,
    storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(
            email,
            password
        );

        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
    }
}

export async function findUserByEmail(email) {
    try {
        const user = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal('email', email)]
        );

        if (user.total === 0) return null;

        return user.documents[0];
    } catch (error) {
        throw Error(error);
    }
}

export async function findUserById(userId) {
    try {
        const user = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal('accountId', userId)]
        );

        return user.documents[0];
    } catch (error) {
        throw Error(error);
    }
}

export async function inviteFriendById(user, friend) {
    try {
        const isFriendAlready = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', user.$id), Query.equal('accountId2', friend.$id)]
        );
        if (isFriendAlready.total > 0) return false;

        const res1 = await databases.createDocument(
            config.databaseId,
            config.friendsCollectionId,
            ID.unique(),
            {
                accountId1: user.$id,
                accountId2: friend.$id,
                status: "sent"
            },
        );

        const res2 = await databases.createDocument(
            config.databaseId,
            config.friendsCollectionId,
            ID.unique(),
            {
                accountId1: friend.$id,
                accountId2: user.$id,
                status: "awaiting response"
            },
        );

        return (res1 && res2);
    } catch (error) {
        throw Error(error);
    }
}

export async function getFriendsIds(userId) {
    try {
        const friends = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', userId), Query.orderDesc("status")]
        );
        return friends.documents;
    } catch (error) {
        throw Error(error);
    }
}

export async function acceptFriendRequest(userId, friendId) {
    try {
        const userDocId = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', userId), Query.equal('accountId2', friendId)]
        )
        const friendDocId = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', friendId), Query.equal('accountId2', userId)]
        )

        const res1 = await databases.updateDocument(
            config.databaseId,
            config.friendsCollectionId,
            userDocId.documents.at(0).$id,
            {
                "status": "accepted"
            }
        )
        const res2 = await databases.updateDocument(
            config.databaseId,
            config.friendsCollectionId,
            friendDocId.documents.at(0).$id,
            {
                "status": "accepted"
            }
        )

        return (res1 && res2);
    } catch (error) {
        throw Error(error);
    }
}

export async function denyFriendRequest(userId, friendId) {
    try {
        const userDocId = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', userId), Query.equal('accountId2', friendId)]
        )
        const friendDocId = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', friendId), Query.equal('accountId2', userId)]
        )

        const res1 = await databases.deleteDocument(
            config.databaseId,
            config.friendsCollectionId,
            userDocId.documents.at(0).$id
        )
        const res2 = await databases.deleteDocument(
            config.databaseId,
            config.friendsCollectionId,
            friendDocId.documents.at(0).$id
        )

        return (res1 && res2);
    } catch (error) {
        throw Error(error);
    }
}

export async function getMyGames(userId) {
    try {
        const games = await databases.listDocuments(
            config.databaseId,
            config.gamesCollectionId,
            [Query.equal('creator', userId)]
        );
        return games.documents;
    } catch (error) {
        throw Error(error);
    }
}

export async function getGamesIParticipate(userId) {
    try {
        const games = await databases.listDocuments(
            config.databaseId,
            config.usersPointsCollectionId,
            [Query.equal('accountId', userId)]
        );
        let ids = [];
        for (let i = 0; i < games.documents.length; i++) {
            ids.push(games.documents[i].gameId);
        }
        return ids;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getGameById(gameId) {
    try {
        const game = await databases.listDocuments(
            config.databaseId,
            config.gamesCollectionId,
            [Query.equal('$id', gameId)]
        )
        return game.documents[0];
    } catch (error) {
        throw Error(error);
    }
}

export async function getGamesById(games) {
    try {
        const myGames = [];
        for (const game of games) {
            const temp = await databases.listDocuments(
                config.databaseId,
                config.gamesCollectionId,
                [Query.equal('gameId', game.gameId)]
            )
            myGames.push(temp.documents[0]);
        }
        return myGames;
    } catch (error) {
        throw Error(error);
    }
}

export async function getParticipantsByGameId(gameId) {
    try {
        const participants = await databases.listDocuments(
            config.databaseId,
            config.usersPointsCollectionId,
            [Query.equal('gameId', gameId), Query.orderDesc('points')]
        )
        return participants.documents;
    } catch (error) {
        throw Error(error);
    }
}

export async function addPoint(id, points) {
    try {
        await databases.updateDocument(
            config.databaseId,
            config.usersPointsCollectionId,
            id,
            {'points': points+1}
        )
    } catch (error) {
        throw Error(error);
    }
}

export async function takePoint(id, points) {
    try {
        await databases.updateDocument(
            config.databaseId,
            config.usersPointsCollectionId,
            id,
            {'points': points-1}
        )
    } catch (error) {
        throw Error(error);
    }
}

export async function getFilePreview(fileId, type) {
    let fileUrl;

    try {
        if (type === 'image') {
            fileUrl = storage.getFilePreview(
                config.storageId,
                fileId,
                2000, 2000, 'top', 100);
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw Error(error);
    }
}

export async function uploadFile(file, type) {
    if (!file) return;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri
    };

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw Error(error);
    }
}

export async function createGame(form) {
    try {
        const thumbnailUrl = await uploadFile(form.thumbnail, 'image');

        const newGame = await databases.createDocument(
            config.databaseId,
            config.gamesCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                creator: form.creator,
                gameId: ID.unique(),
            }
        );

        return newGame;
    } catch (error) {
        throw Error(error);
    }
}

export async function insertParticipants(game, creator, participants) {
    try {
        await databases.createDocument(
            config.databaseId,
            config.usersPointsCollectionId,
            ID.unique(),
            {
                accountId: creator.$id,
                gameId: game.$id,
            }
        )

        for (const participant of participants) {
            await databases.createDocument(
                config.databaseId,
                config.usersPointsCollectionId,
                ID.unique(),
                {
                    accountId: participant.$id,
                    gameId: game.$id,
                }
            )
        }
    } catch (error) {
        throw Error(error);
    }
}

export async function changeUserAvatar(user, avatar) {
    try {
        const thumbnailUrl = await uploadFile(avatar, 'image');

        await databases.updateDocument(
            config.databaseId,
            config.usersCollectionId,
            user.$id,
            {
                'avatar': thumbnailUrl,
            }
        )
    } catch (error) {
        throw Error(error);
    }
}

export async function getNumTotalGames(userId) {
    try {
        const totalGames = await databases.listDocuments(
            config.databaseId,
            config.usersPointsCollectionId,
            [Query.equal('accountId', userId)]
        );
        return totalGames.documents.length;
    } catch (error) {
        throw Error(error);
    }
}

export async function getNumTotalPoints(userId) {
    try {
        const points = await databases.listDocuments(
            config.databaseId,
            config.usersPointsCollectionId,
            [Query.equal('accountId', userId), Query.select(['points'])]
        )
        let totalPoints = 0;
        for (let i = 0; i < points.documents.length; i++) {
            totalPoints += points.documents[i].points;
        }
        return totalPoints;
    } catch (error) {
        throw Error(error);
    }
}

export async function getNumTotalFriends(userId) {
    try {
        const totalFriends = await databases.listDocuments(
            config.databaseId,
            config.friendsCollectionId,
            [Query.equal('accountId1', userId), Query.equal('status', 'accepted')]
        );
        return totalFriends.documents.length;
    } catch (error) {
        throw Error(error);
    }
}

export async function unFriendById(userId, friendId) {
    try {
        const userDoc1 = await databases.listDocuments(config.databaseId, config.friendsCollectionId,
            [Query.equal('accountId1', userId), Query.equal('accountId2', friendId)]);
        const userDoc2 = await databases.listDocuments(config.databaseId, config.friendsCollectionId,
            [Query.equal('accountId1', friendId), Query.equal('accountId2', userId)]);

        await databases.deleteDocument(config.databaseId, config.friendsCollectionId,
            userDoc1.documents[0].$id)

        await databases.deleteDocument(config.databaseId, config.friendsCollectionId,
            userDoc2.documents[0].$id)

        return true;
    } catch (error) {
        throw Error(error);
    }
}

export async function removeParticipantFromGame(userId) {
    try {
        await databases.deleteDocument(config.databaseId, config.usersPointsCollectionId,
            userId);

        return true;
    } catch (error) {
        throw Error(error);
    }
}

export async function getGameLogs(gameId) {
    try {
        const logs = await databases.listDocuments(
            config.databaseId,
            config.gameLogsCollectionId,
            [Query.equal('gameId', gameId), Query.limit(50), Query.orderDesc('$createdAt')]
        )
        return logs.documents;
    } catch (error) {
        throw Error(error);
    }
}

export async function addGameLog(gameId, userId, action, message) {
    try {
        await databases.createDocument(
            config.databaseId,
            config.gameLogsCollectionId,
            ID.unique(),
            {
                accountId: userId,
                gameId: gameId,
                action: action,
                message: message
            }
        )

        return true;
    } catch (error) {
        throw Error(error);
    }
}

export async function isCreator(userId, gameId) {
    try {
        const game = await databases.listDocuments(
            config.databaseId,
            config.gamesCollectionId,
            [Query.equal('$id', gameId)]
        )
        return game.documents[0].creator.$id === userId;
    } catch (error) {
        throw Error(error);
    }
}

export async function deleteGameById(gameId) {
    try {
        console.log("Deleting game");
        const participants = await getParticipantsByGameId(gameId);
        for (let participant of participants) {
            await databases.deleteDocument(config.databaseId, config.usersPointsCollectionId,
                participant.$id)
        }

        const gameLogId = await databases.listDocuments(config.databaseId, config.gameLogsCollectionId,
            [Query.equal('gameId', gameId), Query.select(['$id']) ]);
        for (let gameLog of gameLogId.documents) {
            await databases.deleteDocument(config.databaseId, config.gameLogsCollectionId,
                gameLog.$id);
        }

        await databases.deleteDocument(config.databaseId, config.gamesCollectionId,
            gameId);
    } catch (error) {
        throw Error(error);
    }
}