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
  <div class="hero is-fullheight">
    <Search @search="handleSearch" />
    <h1 class="title">Authors list</h1>
    <button class="button" @click="createAuthor">Add new author</button>
    <div class="hero-body">
        <div class="container">
            <div v-if="isLoading">Loading</div>
            <AuthorsCard v-else :authors="authors">
              <template v-slot:edit-author="author">
                <button class="button" @click="updateAuthor">Edit</button>
              </template>
              <template v-slot:delete-author="author">
                <button class="button" @click="confirmDeleteAuthor">Delete</button>
              </template>
            </AuthorsCard>
        </div>
    </div>
    <Pagination
      :total-items="itemCount"
      @update="handlePagination"
    />
    <Modal/>
  </div>
</template>


<style scoped>

</style>