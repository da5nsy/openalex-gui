<template>
  <div>
    <v-menu
        rounded
        offset-y
    >
      <template v-slot:activator="{on}">
        <v-btn
            text
            rounded
            v-on="on"
            class="font-weight-regular"
            :disabled="disabled"
        >
          <template v-if="myConfig.id === 'sort'">
            <v-icon left>mdi-sort</v-icon>
            Sort
<!--            {{ selectedSortConfig.displayName }}-->

          </template>
          <template v-if="myConfig.id === 'group_by'">
            Add
            <v-icon right>mdi-menu-down</v-icon>
          </template>
          <template v-if="myConfig.id === 'column'">
            <v-icon>mdi-plus</v-icon>
          </template>
        </v-btn>
      </template>
      <!--      <v-card class="pa-4" v-if="action==='filter'">-->
      <!--&lt;!&ndash;        <filter-chips-list/>&ndash;&gt;-->
      <!--        <v-btn text rounded-->
      <!--        @click="$store.state.activeFilter = 'default.search'"-->
      <!--      >-->
      <!--        do it-->
      <!--      </v-btn>-->
      <!--      </v-card>-->
      <v-card flat class="">
        <v-list>
          <v-list-item
              v-for="key in menuOptions"
              :key="key"
              color="primary"
              :value="key"
              :disabled="myConfig?.disableKeys?.includes(key)"
              @click="clickOption(key)"
          >
            <v-list-item-icon>
              <v-icon>{{ getKeyIcon(key) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ getKeyDisplayName(key) }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-if="selectedOptions.includes(key)">mdi-check</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider/>
          <v-list-item @click="openMoreDialog">
            <v-list-item-content>
              <v-list-item-title>More</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-card>
    </v-menu>
    <v-dialog
        v-model="isMoreDialogOpen"
        scrollable
        max-width="400"
    >
      <v-card rounded>
        <v-toolbar flat>
          <v-toolbar-title>More {{ myConfig.displayName }} options</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="closeMoreDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider/>
        <v-card-text class="pa-0">

          <v-list-item
              v-for="key in allOptions"
              :key="key"
              color="primary"
              :value="key"
              :disabled="myConfig?.disableKeys?.includes(key)"
              @click="clickOption(key)"
          >
            <v-list-item-icon>
              <v-icon>{{ getKeyIcon(key) }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ getKeyDisplayName(key) }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon v-if="selectedOptions.includes(key)">mdi-check</v-icon>
            </v-list-item-action>
          </v-list-item>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>


</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import {facetConfigs, facetsByCategory, getFacetConfig} from "@/facetConfigs";
import {url} from "@/url";
import {getActionConfig, getActionDefaultValues} from "@/actionConfigs";


export default {
  name: "Template",
  components: {},
  props: {
    action: String,
    disabled: Boolean,
  },
  data() {
    return {
      foo: 42,
      isMoreDialogOpen: false,
      isEditDialogOpen: true,
    }
  },
  computed: {
    ...mapGetters([
      "resultsFilters",
      "entityType",
    ]),
    selected: {
      get() {
        if (this.action === 'sort') {
          return url.getSort(this.$route)
        } else if (this.action === "group_by") {
          return url.getGroupBy(this.$route)
        } else if (this.action === "column") {
          return url.getColumn(this.$route)
        }
      },
      set(to) {
        if (this.action === 'sort') {
          url.setSort(to)
        } else if (this.action === "group_by") {
          url.setGroupBy(to)
        } else if (this.action === "column") {
          url.setColumn(to)
        }
      }
    },
    selectedOptions() {
      return url.getActionValueKeys(this.$route, this.action)
    },
    allOptions() {
      return facetConfigs(this.entityType)
          .filter(conf => conf.actions?.includes(this.action))
          .map(conf => conf.key)
    },
    popularOptions() {
      return facetConfigs(this.entityType)
          .filter(conf => conf.actionsPopular?.includes(this.action))
          .map(conf => conf.key)
    },
    menuOptions() {
      const ret = [...this.popularOptions]
      this.selectedOptions.forEach(optionKey => {
        if (!this.popularOptions.includes(optionKey)) {
          ret.push(optionKey)
        }
      })
      return ret
    },
    selectedSortConfig(){
      if (this.action !== 'sort') return
      const key = url.getSort(this.$route)
      return getFacetConfig(this.entityType, key)
    },


    myConfig() {
      return getActionConfig(this.action)
    },
  },

  methods: {
    ...mapMutations([
      "snackbar",
    ]),
    ...mapActions([]),
    isDefault(key) {
      const defaults = getActionDefaultValues(this.action, this.$route.query)
      return defaults.includes(key)
    },
    getKeyDisplayName(key) {
      return getFacetConfig(this.entityType, key)?.displayName
    },
    getKeyIcon(key){
      return getFacetConfig(this.entityType, key)?.icon

    },
    openMoreDialog() {
      this.isMoreDialogOpen = true
    },
    closeMoreDialog() {
      this.isMoreDialogOpen = false
    },
    clickOption(key) {
      this.isMoreDialogOpen = false
      if (this.action === 'sort') {
        url.toggleSort(key)
      } else if (this.action === "group_by") {
        url.toggleGroupBy(key)
      } else if (this.action === "column") {
        url.toggleColumn(key)
      } else if (this.action === "filter") {
        this.openFilterEditDialog(key)
      }
    },
    openFilterEditDialog(key) {
      console.log("openFilterEditDialog()", key)
    }


  },
  created() {
  },
  mounted() {
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(to) {


      }
    },
  }
}
</script>

<style scoped lang="scss">

</style>