<template>
  <div class="flex flex-col items-center py-10">
    <div class="flex flex-col items-center w-3/4 lg:w-1/3 bg-gray-800 py-6 text-gray-300">
      <img
        class="h-40 w-auto object-cover rounded-full"
        :src="'https://www.gravatar.com/avatar/' + hashedEmail + '?d=robohash&s=125'"
        alt="avatar"
        srcset=""
      />
      <p class="sm:text-lg md:text-2xl px-2">
        {{ jobSeeker.profile.title }} {{ jobSeeker.profile.firstName }}
        {{ jobSeeker.profile.lastName }}
      </p>
      <p>
        {{ jobSeeker.profile.email }}
      </p>
      <p>
        {{ jobSeeker.profile.phoneNumber }}
      </p>
      <address>
        {{ jobSeeker.address.secondaryAddress }},
        {{ jobSeeker.address.streetAddress }}
      </address>
      <address>
        {{ jobSeeker.address.city }}, {{ jobSeeker.address.state }},
        {{ jobSeeker.address.country }}
      </address>
    </div>
    <nav class="flex flex-col sm:flex-row bg-gray-800 border-b-2 border-teal-600 w-3/4 lg:w-1/3">
      <button :class="[tabCurrent == 1 ? 'tab-current' : '', 'tab']" @click="toggleTab(1)">
        Profile
      </button>
      <button :class="[tabCurrent == 2 ? 'tab-current' : '', 'tab']" @click="toggleTab(2)">
        Education
      </button>
      <button :class="[tabCurrent == 3 ? 'tab-current' : '', 'tab']" @click="toggleTab(3)">
        Work History
      </button>
      <button :class="[tabCurrent == 4 ? 'tab-current' : '', 'tab']" @click="toggleTab(4)">
        Referee
      </button>
    </nav>
    <div class="bg-white rounded overflow-hidden shadow-lg p-6 w-3/4 lg:w-1/3">
      <div class="bg-white">
        <div>
          <div v-if="tabCurrent == 1" id="tab1" class="tab-pane min-h-full">
            <dl>
              <dt>Profile</dt>
              <dd>{{ jobSeeker.resume.careerProfile }}</dd>
            </dl>
          </div>

          <div v-if="tabCurrent == 2" id="tab2" class="tab-pane min-h-full">
            <dl>
              <dt>Qualification</dt>
              <dd>{{ jobSeeker.resume.education.qualification }}</dd>

              <dt>Programme</dt>
              <dd>{{ jobSeeker.resume.education.programme }}</dd>

              <dt>Institution</dt>
              <dd>{{ jobSeeker.resume.education.institutionName }}</dd>

              <dt>Institution country</dt>
              <dd>{{ jobSeeker.resume.education.institutionCountry }}</dd>
            </dl>
          </div>

          <div v-if="tabCurrent == 3" id="tab3" class="tab-pane min-h-full">
            <dl>
              <dt>Job title</dt>
              <dd>{{ jobSeeker.resume.employment.jobTitle }}</dd>

              <dt>Job description</dt>
              <dd>{{ jobSeeker.resume.employment.jobDescription }}</dd>

              <dt>Organisation</dt>
              <dd>{{ jobSeeker.resume.employment.organisation }}</dd>
            </dl>
          </div>

          <div v-if="tabCurrent == 4" id="tab4" class="tab-pane min-h-full">
            <dt>Name</dt>
            <dd>
              {{ jobSeeker.resume.reference.title }}
              {{ jobSeeker.resume.reference.firstName }}
              {{ jobSeeker.resume.reference.lastName }}
            </dd>

            <dt>Email</dt>
            <dd>
              {{ jobSeeker.resume.reference.email }}
            </dd>

            <dt>Phone number</dt>
            <dd>
              {{ jobSeeker.resume.reference.phoneNumber }}
            </dd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'

export default {
  data() {
    return {
      tabCurrent: 1,
      jobSeeker: null
    }
  },

  async asyncData({ $axios }) {
    const randomJobSeeker = await $axios.$get(
      'https://randomapi.com/api/82f8602e490a7471cc836ba4f8c4ef08'
    )

    const jobSeeker = randomJobSeeker.results[0]

    const hashedEmail = md5(jobSeeker.profile.email).toString()

    return { jobSeeker, hashedEmail }
  },

  methods: {
    toggleTab(tab) {
      this.tabCurrent = tab
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-current {
  @apply bg-teal-600 text-gray-300 font-medium;
}
</style>
