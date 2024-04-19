import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const character = characters[index];
    if(character && character.id) {
      fetch(`http://localhost:8000/users/${character.id}`, {
            method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            const updated = characters.filter((character, i) => {
              return i !== index;
            });
            setCharacters(updated);
          } else if (response.status === 404) {
              console.error('User not found, unable to delete');
          } else {
              throw new Error('Failed to delete the user');
          }
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    } else {
      console.error('User data is incomplete, cannot delete. ')
    }
  }
  
  /**function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }**/

  function updateList(person) { 
    postUser(person)
      .then((updatedPerson) => {
        setCharacters(prevCharacters => [...characters, updatedPerson])
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    }).then(response => {
      if (response.ok && response.status === 201) {
          return response.json();
      } else {
          throw new Error('Something went wrong');
      }
  });
    return promise;
  }

  return (
    <div className="container">
      <Table 
      characterData={characters}
      removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;