<template>
  <div>

    <v-layout row>
      <v-flex sm12 sm12>

        <v-card>
          <v-alert v-if="alert" :type="alert.type" dismissible v-model="alert">
            {{ alert.text }}
          </v-alert>
          <v-toolbar color="inspire" dark>
            <v-flex ms12 sm12 column  class="text-lg-left">
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <span class="text-lg-right">{{subTitle}}</span>
            </v-flex>
          </v-toolbar>
          <v-list two-line>
            <v-container grid-list-xl >
              <v-form ref="form" lazy-validation>
                <v-layout row wrap>
                  <v-flex xs12>
                    <div>

                    </div>
                  </v-flex>

                  <v-btn block @click="" color="primary"> Start&nbsp;<v-icon>search</v-icon></v-btn>

                </v-layout>
              </v-form>
            </v-container>

          </v-list>
        </v-card>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Api, { handleError } from '../libraries/api'
const api = new Api()

export default {
  name: 'library',
  data() {
    return {
      title: 'Page name',
      subTitle: 'Subtitle for page',
      alert: null,
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  computed: {

  },
  created() {},
  mounted() {
    document.title = 'Your browser tab title here'
    this.onInit();
  },
  methods: {
    onInit(){
      /* fetch some data maybe */
      api.get()
        .then((response) => {
          /* do something with response */
        })
        .catch(handleError)
    }
  }
}
</script>


<style lang="stylus">
  .library
    background white
</style>
