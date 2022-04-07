<template>
  <div class="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
    <Search :students="searchResults.length ? searchResults : students" @searchResults="handleSearchResults($event)"/>
    <div class="mt-2" v-if="students.length">
      <StudentProfile
          v-for="student in  searchResults.length ? searchResults : students"
          :student="student"
          :key="student.id"
          @addTag="handleNewTag($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount} from "vue";
import Search from "@/components/Search.vue"
import StudentProfile from "@/components/StudentProfile.vue";
import axios from "@/plugins/axios";
import StudentProfileType from "@/shared/interfaces/student-profile";
import {initialStudentValue} from "@/shared/constants";

export default defineComponent({
  components: {Search, StudentProfile},

  setup () {
    const students = ref([initialStudentValue])
    const searchResults = ref([initialStudentValue])
    onBeforeMount(() => {
      searchResults.value = []
      students.value = []
      axios.get("/assessment/students").then(
          (response: any) => {students.value = response.data.students}
      )
    })
    return {
      students,
      searchResults,
      handleSearchResults(results: { city: string; company: string; email: string; firstName: string; grades: never[]; id: string; lastName: string; pic: string; skill: string; tags: never[]; }[]) {
        searchResults.value = results
      },
      handleNewTag({studentId, tag}: {studentId: string, tag: string}) {
        students.value.forEach((student: StudentProfileType) => {
          if(student.id === studentId) {
            if(student.tags?.length) student.tags.push(tag);
            else student.tags = [tag]
          }
        })
      }
    }
  }
})
</script>

<style>
@font-face {
  font-family: "Raleway";
  src: local("Raleway"),
  url(./assets/fonts/Raleway/static/Raleway-Regular.ttf) format("truetype");
}

#app {
  font-family: Raleway;
  scroll-behavior: smooth;
}
</style>
