import WorksCard from '~/components/WorksCard.vue'

export default {
  title: 'Works'
}

export const card = () => ({
  template: '<works-card/>',
  components: { WorksCard }
})
