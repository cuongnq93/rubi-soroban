<template>
  <div class="activity-container">
    <ul class="activity">
      <li v-for="(activity, index) in activities" :key="index" class="activity--item activity--circle">
        <span>{{ activity.number }}</span>
        <span class="expand">{{ activity.sum }}</span>
      </li>
    </ul>
    <div class="result">
      {{ getCurrentSum() }}
    </div>
  </div>
</template>
<script>
import { toRefs, onMounted, computed } from "vue"
import useSoroban from "../composables/useSoroban"

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { data } = toRefs(props)

    const { calculations, generate, getCurrentSum } = useSoroban()

    onMounted(() => {
      generate(data.value.rows)
    })

    const activities = computed(() => {
      return calculations.value.map((number, index, data) => {
        const sum = data.slice(0, index + 1).reduce((a, b) => a + b, 0)
        return {
          number,
          sum
        }
      })
    })
    
    return {
      calculations,
      getCurrentSum,
      activities,
    }
  },
}
</script>