import {Account, Avatars, Client, Databases, ID, Query, Storage} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.goulart.segueolider',
    projectId: '67b9091700239d5cf49e',
    databaseId: '67b90acd000f1c72d41e',
    usersCollectionId: '67b90aee00273b3df1d4',
    friendsCollectionId: '67ba0926000aec163c05',
    gamesCollectionId: '67b90b100037b9c8f9e7',
    usersPointsCollectionId: '67b923f10001e3d01894',
    storageId: '67b92743000b323afcbe'
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
        )
        if (isFriendAlready.total > 0) return false;

        const res1 = await databases.createDocument(
            config.databaseId,
            config.friendsCollectionId,
            ID.unique(),
            {
                accountId1: user.$id,
                accountId2: friend.$id,
                username: friend.username,
                avatar: friend.avatar,
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
                username: user.username,
                avatar: user.avatar,
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
            [Query.equal('accountId', userId), Query.select(['gameId'])]
        );
        let ids = [];
        for (let i = 0; i < games.total; i++) {
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
            [Query.equal('gameId', gameId)]
        )
        return game.documents[0];
    } catch (error) {
        throw Error(error);
    }
}

export async function getGamesById(ids) {
    try {
        const games = [];
        for (const id of ids) {
            const game = await databases.listDocuments(
                config.databaseId,
                config.gamesCollectionId,
                [Query.equal('gameId', id)]
            )
            games.push(game.documents[0]);
        }
        return games;
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
                dateCreated: form.dateCreated
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
                username: creator.username,
                gameId: game.gameId,
                avatar: creator.avatar,
            }
        )

        for (const participant of participants) {
            await databases.createDocument(
                config.databaseId,
                config.usersPointsCollectionId,
                ID.unique(),
                {
                    accountId: participant.accountId2,
                    username: participant.username,
                    gameId: game.gameId,
                    avatar: participant.avatar,
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