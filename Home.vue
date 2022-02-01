 <template>
  <v-container class="pa-8" fluid>
    <h1 class="h1">Minha lista de tarefas</h1>
    <v-form>
      <v-container>
        <v-text-field label="Nova tarefa" v-model="novaTarefa">
          <v-icon slot="append" @click="adicionar">mdi-send</v-icon>
        </v-text-field>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="tarefa of tarefas" :key="tarefa.id">
          {{ tarefa.titulo }}
          <v-spacer></v-spacer>
          <v-icon class="pr-1">mdi-calendar</v-icon>
          {{ tarefa.dataGravacao }}
          <v-spacer></v-spacer>
          <v-icon @click="deletar(tarefa.id)">mdi-delete</v-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import * as fb from "@/plugins/firebase";
export default {
  data() {
    return {
      uid: "",
      novaTarefa: "",
      data: new Date(),
      tarefas: [],
    };
  },
  mounted() {
    this.uid = fb.auth.currentUser.uid;
    this.buscarTarefas();
  },
  methods: {
    async buscarTarefas() {
      this.tarefas = [];
      const logTasks = await fb.tasksCollection
        .where("owner", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.tarefas.push({
          id: doc.id,
          titulo: doc.data().titulo,
          dataGravacao: doc.data().dataGravacao,
        });
      }
    },
    async adicionar() {
      await fb.tasksCollection.add({
        titulo: this.novaTarefa,
        dataGravacao:
          this.data.getDate() +
          "/" +
          (this.data.getMonth() + 1) +
          "/" +
          this.data.getFullYear(),
        owner: this.uid,
      });
      this.novaTarefa = "";
      this.buscarTarefas();
    },
    async deletar(id) {
      await fb.tasksCollection.doc(id).delete();
      this.buscarTarefas();
    },
  },
};
</script>

<style>
</style>