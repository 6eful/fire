import React, {Component} from 'react';
import firebase from 'firebase';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      nomeInput: '',
      idadeInput: '',
      tokenInput: '',
      token: 'Carregando...',
      nome: '',
      idade: ''
    };

    this.cadastrar = this.cadastrar.bind(this);

    let firebaseConfig = {
      apiKey: "AIzaSyB1Rl5HlcnXYvNjSZpr7QugUiiD_Nj7N10",
      authDomain: "reactapp-76536.firebaseapp.com",
      projectId: "reactapp-76536",
      storageBucket: "reactapp-76536.appspot.com",
      messagingSenderId: "623690341768",
      appId: "1:623690341768:web:0be363776812c147bdee3d",
      measurementId: "G-J8FJ0TE79D"
    };

    if (!firebase.apps.length) {
       firebase.initializeApp(firebaseConfig);
    }else {
       firebase.app();
    }

    firebase.database().ref('token').on('value',(snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    firebase.database().ref('usuarios').child(1).on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });

  }

  cadastrar(e){
    //Inserindo um novo dado
    //firebase.database().ref('token').set(this.state.tokenInput);

    //firebase.database().ref('usuarios').child(1).child('idade').set(this.state.idadeInput);

    //Vai criar um campo se não existe
    //firebase.database().ref('usuarios').child(1).child('cargo').set(this.state.tokenInput)

    //firebase.database().ref('usuarios').child(1).child('cargo').remove();

    let usuarios = firebase.database().ref('usuarios');
    //Criar chave aleatoria
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idadeInput
    })

    e.preventDefault();
  }

  render(){
    //DESCONSTRUINDO
    const {token, nome, idade} = this.state;
    return(
      <div>
        <form onSubmit={this.cadastrar}>

        <label>Token</label>
        <input type="text" value={this.state.tokenInput}
               onChange={(e) => this.setState({tokenInput: e.target.value})} /><br/>

          <label>Nome</label>
          <input type="text" value={this.state.nomeInput}
                 onChange={(e) => this.setState({nomeInput: e.target.value})} /><br/>

          <label>Idade</label>
          <input type="text" value={this.state.idadeInput}
                 onChange={(e) => this.setState({idadeInput: e.target.value})} /><br/>
          <button type="submit">Cadastrar</button>
        </form>


        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
  }
}
