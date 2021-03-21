import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: ''
    };

    let firebaseConfig = {
      apiKey: "AIzaSyB1Rl5HlcnXYvNjSZpr7QugUiiD_Nj7N10",
      authDomain: "reactapp-76536.firebaseapp.com",
      projectId: "reactapp-76536",
      storageBucket: "reactapp-76536.appspot.com",
      messagingSenderId: "623690341768",
      appId: "1:623690341768:web:0be363776812c147bdee3d",
      measurementId: "G-J8FJ0TE79D"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
       firebase.initializeApp(firebaseConfig);
    }else {
       firebase.app(); // if already initialized, use that one
    }
    //firebase.initializeApp(firebaseConfig);
    //firebase.analytics();

    // metodo on: olheiro -> sempre de olho no dataase, verificando se há mudança no databse
    /*firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });*/

    //Olhou somente quando carregado
    firebase.database().ref('token').once('value').then((snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    /*firebase.database().ref('usuarios').child(1).child('nome').on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val();
      this.setState(state);
    });*/

    firebase.database().ref('usuarios').child(1).on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });

  }

  render(){
    //DESCONSTRUINDO
    const {token, nome, idade} = this.state;
    return(
      <div>
        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
  }
}
