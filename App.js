import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList } from 'react-native';

export default function App() {

  const [temp,setTemp] = useState('')
  const [clima,setClima] = useState('')
  const [cidade,setCidade] = useState('')
  const [listCity,setListCity] = useState('')

  const listData = [listCity,"Temperatura: "+temp+"°C","Clima: "+clima]

  const getTemp = async () =>{
    try{
      const response = await fetch('https://weather.contrateumdev.com.br/api/weather/city/?city='+cidade)
      const data = await response.json()
      setListCity(data.name)
      setTemp(data.main['temp'])
      setClima(data.weather[0]['description'])
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput style={styles.input} placeholder='Digite sua cidade...' value={cidade} onChangeText={setCidade}></TextInput>
        <TouchableOpacity style={styles.createGroupButton} onPress={getTemp}>
          <Text style={styles.textStyle}> Pesquisar Clima </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listArea}>
        <Text style={styles.listItem}>Cidade: {listCity}</Text>
        <Text style={styles.listItem}>Temperatura: {temp}°C</Text>
        <Text style={styles.listItem}>Clima: {clima}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    justifyContent: 'center',
  },
  inputArea:{
    alignItems:'center'
  },
  input:{
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  createGroupButton: {
    backgroundColor: "#424C55",
    width: '80%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white'
  },
  listItem:{
    fontSize:22,
    fontWeight:'700',
    color: 'black',
    marginTop: 10
  },
  listArea:{
    marginTop: 50,
    marginLeft: '10%'
  }
});
