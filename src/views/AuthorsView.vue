<script setup lang="ts">
import { useAuthorsStore} from '@/stores/AuthorStore'
import { useModalStore } from '@/stores/ModalStore';
import { useCurrentUserStore } from '@/stores/CurrentUserStore';
import { type IModalProps } from '@/interface/IModal';
import { type IAuthor } from '@/interface/IAuthors';
import { ref } from 'vue'
import AuthorsCard from '@/components/authors/AuthorsCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import CreateAuthor from '@/components/authors/CreateAuthor.vue';
import Modal from '@/components/common/Modal.vue';
import Search from '@/components/common/Search.vue';
import UpdateAuthor from '@/components/authors/UpdateAuthor.vue';
import ConfirmationWindow from '@/components/common/ConfirmationWindow.vue';


const authorsStore = useAuthorsStore()
const modalStore = useModalStore()
const currentUserStore = useCurrentUserStore()
const authors = ref<IAuthor[]>([]);
const isLoading = ref(true)
const currentPage = ref(1)
const query = ref('')
const itemCount = ref(0)
const itemsPerPage = ref(5)


const loadData = async (page: number, limit: number) => {
    isLoading.value = true;
    authors.value = [];

    try {
      const response = await authorsStore.fetchAuthors(
        currentPage.value,
        itemsPerPage.value,
        query.value
      );
      if (response) {
          authors.value = response.data as IAuthor[]
          itemCount.value = response.totalCount
      }


    } catch (err: any) {
      console.error('Erorr loading data:', err)
    } finally {
      isLoading.value = false
    }

}

const createAuthor = () => {
  const createPayload: IModalProps = {
    component: CreateAuthor,
    props: {
      callbackfn: () => {
        isLoading.value = true
        authors.value = []
        setTimeout(async () => {
          await loadData()
        }, 50)
      }
    }
  }
  modalStore.openModal(createPayload)
}


const updateAuthor = (id: number) => {
  const updatePayload: IModalProps = {
    component: UpdateAuthor,
    props: {
      id,
      callbackfn: () => {
        isLoading.value = true
        authors.value = []
        setTimeout(async () => {
          await loadData()
        }, 50)
      }
    }
  }

  modalStore.openModal(updatePayload)
}



const handlePagination = ({ page, limit} : { page: number; limit: number}) => {
  currentPage.value = page.value
  itemsPerPage.value = limit
  
  setTimeout( async () => {
    await loadData()
  }, 50);
}


const handleSearch = (searchParams: { [key: string]: string }) => {
    query.value = searchParams;
    currentPage.value = 1
    loadData(currentPage.value, itemsPerPage.value)
}

const confirmDeleteAuthor = (id: number, name?: string, surname?: string) => {
  const confirmPayload: IModalProps = {
    component: ConfirmationWindow,
    props: {
      title: 'Deleting Author...',
      message: `Are you sure you want to delete ${name} ${surname}?`,
      callbackfn: (confirmed: boolean) => {
        if (confirmed) {
          authorsStore.deleteAuthor(id)
          setTimeout(async () => {
            await loadData()
          }, 50)
        }
        modalStore.closeModal()
      }
    }
  }
  modalStore.openModal(confirmPayload)
}







loadData()
</script>

<template>
  <div class="hero is-fullwidth">
    <div class="hero-head">
      <div class="container has-text-centered">
        <h1 class="title mt-4 has-text-white">Authors List</h1>
        <template v-if="currentUserStore.currentUser">
          <div class="button-container">
            <button class="button is-primary mt-4 is-rounded" @click="createAuthor">
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span class="ml-1">Add New Author</span>
            </button>
          </div>
        </template>
        <Search @search="handleSearch"/>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <div v-if="isLoading" class="has-text-centered">Loading...</div>
        <div v-else>
          <AuthorsCard :authors="authors">
            <template v-slot:edit-author="{ author }">
              <template v-if="currentUserStore.currentUser">
                <button class="button is-warning" @click="updateAuthor(author.id)">
                  <span class="icon is-small">
                    <i class="fas fa-edit"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </template>
            </template>
            <template v-slot:delete-author="{ author }">
              <template v-if="currentUserStore.currentUser">
                <button class="button is-danger" @click="confirmDeleteAuthor(author.id, author.name, author.surname)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </template>
            </template>
          </AuthorsCard>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="container has-text-centered p-3">
        <Pagination :total-items="itemCount" @update="handlePagination" />
      </div>
    </div>
    <Modal />
  </div>
</template>

<style scoped>
.hero {
  background-color: #FAF6F6;
  margin-top: -1.2%;
}

.hero-head,
.hero-foot {
  background-color: #0B132B;
  color: #FAF6F6;
}

.hero-foot {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.title {
  margin-bottom: 1rem;
  color: #0B132B;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.button {
  display: flex;
  align-items: center;
  color: #FAF6F6;
}

.button .icon {
  margin-right: 0.5rem;
}

.button.is-primary {
  background-color: #209CEE;
  border-color: #209CEE;
}

.button.is-primary:hover {
  background-color: #1C2541;
  border-color: #1C2541;
}

.button.is-warning {
  background-color: #F5A623;
  border-color: #F5A623;
  color: #FFFFFF;
}

.button.is-warning:hover {
  background-color: #F1C40F;
  border-color: #F1C40F;
}

.button.is-danger {
  background-color: #FF3860;
  border-color: #FF3860;
  color: #FFFFFF;
}

.button.is-danger:hover {
  background-color: #FF1E48;
  border-color: #FF1E48;
}
</style>