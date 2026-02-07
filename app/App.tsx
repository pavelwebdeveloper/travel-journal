import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getAllNotes, initDB, Note as NoteType } from "../database/db";
import Note from "./NotePreview";

const App = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);

    const { width } = Dimensions.get("window");

    const router = useRouter();
    //const navigation = useNavigation();

    useFocusEffect(
      useCallback(() => {
        initDB();
        (async () => {
            const notes = await getAllNotes(); // getting all notes from database
            setNotes(notes); // set notes with notes returned from database
        })();
      }, [])
    );
    

    return (
    <View>
      <Image
      source={require('../assets/images/20221015_153125.jpg')}
      style={[{
        width:width, 
        height:width * 0.5
      }]}
      ></Image>
      <Text style={styles.heading}>Travel Notes List</Text>
      <View style={styles.verticalSpace}></View>
      <FlatList 
        data={notes}
        style={{ height: 400 }}
        keyExtractor={(note) => note.noteId.toString()}
        renderItem={({item}) => <Note note={item}/>}
      />
      <View><Button
        title="Add a note"
        onPress={() =>
          router.push('/addUpdateNote')
        }
      ></Button></View>
    </View>
  );
}

const styles = StyleSheet.create({
    heading:{
      fontWeight:'bold',
      textAlign:'center',
      fontSize:30
    },
    verticalSpace: {
        height:30
    }
  });

export default App;