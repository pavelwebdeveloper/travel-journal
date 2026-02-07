import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getPhotosForNote, Note as NoteType, Photo } from "../database/db";

type Props = {
    note: NoteType;
}

const Note = ({ note }: Props) => {
    const [photos, setPhotos] = useState<Photo[]>([]);

    const router = useRouter();

    useEffect(() => {
            (async () => {
                const photos = await getPhotosForNote(note.noteId); // getting all notes from database
                setPhotos(photos); // set notes with notes returned from database
            })();
        }, [note.noteId]);

    //return <Text>Hello, I am a note!!!!</Text>
    return (
        <Pressable style={styles.notePreviwContainer} onPress={
            () =>
          router.push({
            pathname: '/NoteDetails',
            params: {noteId: note.noteId.toString() }
        })
        }>
            <View>
                <Text style={styles.label}>Note Title: </Text><Text>{ note.noteTitle }</Text>
                {photos.length > 0 && (
                                <FlatList
                                    data={photos}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.photoPath}
                                    renderItem={({item}) => (
                                        <Image
                                            source={{ uri: item.photoPath }}
                                            style={styles.image}
                                        />
                                    )}
                
                                />
                            )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    notePreviwContainer:{
        borderBottomColor:'black',
        borderBottomWidth:2,
        padding:10
    },
    label:{
        fontWeight:'bold'
    },
    image: {
      margin:10,
      width:100, 
      height:100
    },
    imageContainer: {
        padding: 2
    },
    verticalSpace: {
        height:30
    }
  });

export default Note;