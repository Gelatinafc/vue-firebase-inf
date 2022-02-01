<template>
  <v-container fill-height fluid text-center>
    <v-container>
      <v-row>
        <v-col
          class="primary--text text-center mx-auto pb-4"
          clos="1"
          sm="4"
          offset="4"
          ><h1 class="h1">Login</h1></v-col
        >
      </v-row>
      <v-row class="elavation-3 mx-auto">
        <v-col cols="auto">
          <v-img
            max-height="150"
            max-width="250"
            src="@/assets/images/firebase_logo.png"
          ></v-img>
        </v-col>
        <v-col>
          <v-form>
            <v-text-field label="Email" v-model="user.email"></v-text-field>
            <v-text-field
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
            <v-row>
              <v-col>
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-btn class="ml-2" color="warning" @click="reset"
                  >Cancelar</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h3>Acesse usando:</h3>
                <v-icon color="blue" @click="loginGoogle">mdi-google</v-icon>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      color="red"
      v-model="inputNull"
      danger
      multline
      :timeout="fiveSeconds"
      >Digite seu email e senha ou conecte-se com o Google para
      entrar</v-snackbar
    >
    <v-snackbar
      color="red"
      v-model="errorLogin"
      danger
      multline
      :timeout="twoSeconds"
      >Senha inválida</v-snackbar
    >
    <v-snackbar
      color="red"
      v-model="weakPassword"
      danger
      multline
      :timeout="twoSeconds"
      >A senha deve ter pelo menos 6 caracteres!</v-snackbar
    >
    <v-snackbar
      color="red"
      v-model="badEmail"
      danger
      multline
      :timeout="twoSeconds"
      >O email está formatado de forma incorreta!</v-snackbar
    >
    <v-dialog v-model="novaConta" persistent max-width="300">
      <v-card>
        <v-card-title>Conta não encontrada</v-card-title>
        <v-card-text>
          A conta não foi localizada. Deseja criar uma nova conta com os dados
          informados?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green draken-1" text @click="criarNovaConta">Sim</v-btn>
          <v-btn color="red draken-1" text @click="novaConta = false"
            >Não</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      user: {},
      show: false,
      inputNull: false,
      errorLogin: false,
      badEmail: false,
      weakPassword: false,
      twoSeconds: 2000,
      fiveSeconds: 5000,
      novaConta: false,
    };
  },
  methods: {
    reset() {
      this.user = "";
    },
    async loginGoogle() {
      await fb.auth.signInWithPopup(fb.googleProvider);
      this.$router.push({ name: "Home" });
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case "auth/argument-error":
            this.inputNull = true;
            break;
          case "auth/invalid-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.badEmail = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
      try {
        this.novaConta = false;
        await fb.auth.createUserWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.login();
      } catch (error) {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case "auth/weak-password":
            this.weakPassword = true;
            break;
          case "auth/invalid-email":
            this.badEmail = true;
            break;
        }
      }
    },
  },
};
</script>

<style>
</style>