<template>
  <div class="grid grid-cols-12 border-b-2 border-gray-100 mt-5 pb-4">
      <div class="pr-5 ml-4 md:col-span-1 md:block lg:col-span-1 lg:block sm:col-span-12 sm:flex sm:flex-row sm:justify-center sm:mb-4">
        <img
            :src="student.pic"
            :alt="student.name"
            class="rounded-full md:w-full sm:w-2/5 align-middle border-2 border-grey-300"
        />
      </div>
      <div class="md:col-span-11 md:pr-6 sm:pr-4 sm:col-span-12 sm:ml-4">
        <div class="flex flex-row justify-between">
          <div class="font-extrabold md:text-4xl lg:text-4xl sm:text-2xl">{{student.firstName + " " + student.lastName}}</div>
          <button @click="showTestGrades = !showTestGrades">
            <span class="text-center font-semibold md:text-5xl lg:text-5xl sm:text-4xl text-gray-400">
              {{showTestGrades ? "-" : "+"}}
            </span>
          </button>
        </div>
        <div class="flex flex-col">
          Company: {{student.company}}<br>
          Email: {{student.email}}<br>
          skill: {{student.skill}}<br>
          Average: {{parseFloat(averageGradeMark).toFixed(3)}}%
          <div class="flex flex-row w-full mt-1 flex-wrap" v-if="student.tags?.length">
            <span
                v-for="(tag, i) in student.tags"
                :key="'tags' + i"
                class="py-1 px-2  bg-gray-300 rounded drop-shadow"
                :class="i > 0 ? 'md:ml-2 sm:m-1' : 'sm:m-1'"
            >
              {{tag}}
            </span>
          </div>
          <input
              type="text"
              placeholder="Add a tag"
              v-model="newTag"
              @keyup.enter="emitAddTag(student.id)"
              class="md:w-2/12 sm:w-8/12 border-gray-200 border-b-2 placeholder-opacity-100 mt-4 focus:outline-none pb-1"
          />
        </div>

        <div v-if="showTestGrades" class="mt-2">
          <div v-for="(test, i) in student.grades" :key="'test' + i">
            Test {{i + 1}}: <span class="ml-4">{{test}}%</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, toRefs} from "vue";
import {initialStudentValue} from "@/shared/constants";

export default defineComponent({
  emits: ["addTag"],
  props: {
    student: {
      required: true,
      default: initialStudentValue
    }
  },
  setup (props, context) {
    const { student } = toRefs(props)
    const newTag = ref("")
    const averageGradeMark  = computed(() => {
      const { grades } = student.value
      return (grades.reduce((a,b) => a + Number(b), 0) / grades.length).toString()
    })

    return {
      averageGradeMark,
      newTag,
      showTestGrades: ref(false),
      emitAddTag(id: string) {
        context.emit("addTag", {studentId: id, tag: newTag.value})
        newTag.value = ""
      }
    }
  }
})
</script>

<style scoped>

</style>