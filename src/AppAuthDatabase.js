import React, {Component} from 'react';
import firebase from './fireConnection';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };

    this.cadastrar = this.cadastrar.bind(this);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        firebase.database().ref('usuarios').child(user.uid).set({
          nome: this.state.nome
        })
        .then(()=>{
          this.setState({nome: '', email: '', senha: ''});
        });
      }
    })

  }


  cadastrar(e){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) =>{
        alert('Codigo de error: ' + error.code);
    })

    e.preventDefault();

  }

  render(){

    return(
      <div>
      <h1>Novo Usuário</h1>
        <form onSubmit={(e)=>{ this.cadastrar(e) }}>

          <label for="nomeInput">Nome: </label>
          <input type="text" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})} id="nomeInput"/><br/>

          <label for="emailInput">Email: </label>
          <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} id="emailInput"/><br/>

          <label for="senhaInput">Senha:</label>
          <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} id="senhaInput" /><br/>

          <button type="submit">Cadastrar</button>
        </form>

      </div>
    );
  }
}
