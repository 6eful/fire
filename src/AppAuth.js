import React, {Component} from 'react';
import firebase from './fireConnection';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: ''
    };

    this.logar = this.logar.bind(this);
    this.sair = this.sair.bind(this);

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        alert('Usuario Logado com sucesso! \n Email: ' + user.email);
      }
    })

  }

  /*cadastrar(e) {
    //recebe um then: sucesso
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    //sucesso
    //.then()
    .catch((error) =>{
      if(error.code === 'auth/invalid-email'){
        alert('Email invalido!');
      }
      if(error.code === 'auth/weak-password'){
        alert('Senha Fraca!');
      }else{
        alert('Codigo de error: ' + error.code)
      }
    })

    e.preventDefault();
  }*/

  logar(e){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) =>{
      if(error.code === 'auth/wrong-password'){
        alert('Senha incorreta!');
      }else{
        alert('Codigo de error: ' + error.code);
      }
    })

    e.preventDefault();

  }

  sair(e){
    firebase.auth().signOut();
    alert('Deslogado com sucesso!');
  }

  render(){

    return(
      <div>
      <h1>Logar</h1>
        <form onSubmit={this.logar}>
          <label for="emailInput">Email: </label>
          <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} id="emailInput"/><br/>

          <label for="senhaInput">Senha:</label>
          <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} id="senhaInput" /><br/>

          <button type="submit">Entrar</button>
        </form>
        <br/>
        <button onClick={this.sair}>Sair</button>
      </div>
    );
  }
}
