import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.goulart.segueolider',
    projectId: '67b9091700239d5cf49e',
    databaseId: '67b90acd000f1c72d41e',
    usersCollectionId: '67b90aee00273b3df1d4',
    friendsCollenctionId: '67ba0926000aec163c05',
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

export const createUser = async (email, password, username) => {
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
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
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

export const getMyGames = async (userId) => {
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