<template>
  <div class="mx-2">
     <input
         id="name-search"
         type="text"
         placeholder="Search by name"
         v-model.trim="nameSearchValue"
         class="w-full border-gray-200 border-b-2 placeholder-opacity-100 mt-4 focus:outline-none pb-1"
     />
     <input
         id="tag-search"
         type="text"
         v-model.trim="tagSearchValue"
         placeholder="Search by tag"
         class="w-full border-gray-200 border-b-2 placeholder-opacity-100 mt-4 focus:outline-none pb-1"
     />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch } from "vue";
import StudentProfileType from "@/shared/interfaces/student-profile";
import {initialStudentValue} from "@/shared/constants";

export default defineComponent({
  emits: ["searchResults"],
  props: {
    students: {
      default: [initialStudentValue]
    }
  },
  setup (props, context) {
    const tagSearchValue = ref("")
    const nameSearchValue = ref("")
    const searchResults = ref([initialStudentValue])

    watch(nameSearchValue, (value: string) => {
      if(value) {
        searchResults.value =  props.students.filter((student: StudentProfileType) =>
            ~`${student.firstName + " " + student.lastName}`.toLowerCase()
                .indexOf(value.toLowerCase())
        )
      } else {
        tagSearchValue.value = ""
        searchResults.value = []
      }
      context.emit("searchResults", searchResults.value)
    })

    watch(tagSearchValue, (value: string) => {
      if(value) {
        props.students.forEach((student) =>  {
          student.tags?.forEach((tag: string) => {
            if(tag.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
              if(searchResults.value.filter(x => x.id === student.id).length === 0) {
                searchResults.value.push(student)
              }
            }
          })
        })
      } else {
        nameSearchValue.value = ""
        searchResults.value = []
      }
      context.emit("searchResults", searchResults.value)
    })
    return {
      tagSearchValue,
      nameSearchValue
    }
  }
})
</script>

<style scoped>

</style>