import React, { useState, useEffect } from "react";

import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })

  },[]);

  async function handleLikeRepository(id) {
    const {data : newRepository } = await api.post(`/repositories/${id}/like`);
    const newRepositories = repositories.map(repository => repository.id !== id ? repository : newRepository);

    setRepositories(newRepositories);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          style={styles.repositoryContainer} 
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
          <>
            <Text style={styles.repository}>{repository.title}</Text>

            <View style={styles.techsContainer}>
              {repository.techs.map(tech => (
                <Text style={styles.tech} key={tech}>
                  {tech}
                </Text>
              ))}
             
            </View>
            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repository.id}`}
              >
                {repository.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id)}
              testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </>
          )}
       />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159",
  },
  repositoryContainer: {   
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    // paddingBottom: 20,
    paddingStart: 20,
    paddingEnd: 10,
    
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159",
    padding: 15,
    marginBottom: 10,
  },
});
