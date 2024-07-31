<script setup lang="ts">
import { type IModalProps } from '@/interface/IModal';
import { usePostsStore } from '@/stores/PostStore'
import { useModalStore } from '@/stores/ModalStore';
import { type IPost } from '@/interface/IPost';
import { ref } from 'vue'
import PostCard from '@/components/posts/PostsCard.vue'
import Pagination from '@/components/common/Pagination.vue';
import Search from '@/components/common/Search.vue';
import Modal from '@/components/common/Modal.vue';
import CreatePost from '@/components/posts/CreatePost.vue'
import UpdatePost from '@/components/posts/UpdatePost.vue';
import ConfirmationWindow from '@/components/common/ConfirmationWindow.vue';

const postsStore = usePostsStore()
const modalStore = useModalStore()
const posts = ref<IPost[]>([]);
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = ref(5)
const itemCount = ref(0);
const query = ref('')


const loadData = async (page: number, limit: number) => {
    isLoading.value = true
    posts.value = []

    try {
        const response = await postsStore.fetchPosts(
            currentPage.value,
            itemsPerPage.value,
            query.value
        );

        if (response) {
            posts.value = response.data as IPost[];
            itemCount.value = response.totalCount
        }

    } catch (err: any) {
        console.error('Error loading data:', err);
    } finally {
        isLoading.value = false;
    }
}

const handlePagination = ({ page, limit}: { page:number; limit: number}) => {
    currentPage.value = page.value
    itemsPerPage.value = limit

    setTimeout(async () => {
        await loadData()
    }, 50)
}

const handleSearch = (searchParams: { [key: string]: string }) => {
    query.value = searchParams;
    currentPage.value = 1
    loadData(currentPage.value, itemsPerPage.value)
}


const createPost = () => {
  const createPayload: IModalProps = {
    component: CreatePost,
    props: {
      callbackfn: () => {
        isLoading.value = true
        posts.value = []
        setTimeout(async () => {
          await loadData()
        }, 50)
      }
    }
  }
  modalStore.openModal(createPayload)
}

const updatePost = (id: number) => {
  const updatePayload: IModalProps = {
    component: UpdatePost,
    props: {
      id,
      callbackfn: () => {
        isLoading.value = true
        posts.value = []
        setTimeout(async () => {
          await loadData()
        }, 50)
      }
    }
  }

  modalStore.openModal(updatePayload)
}


const confirmDeletePost = (id: number, title?: string) => {
  const confirmPayload: IModalProps = {
    component: ConfirmationWindow,
    props: {
      title: 'Deleting Post...',
      message: `Are you sure you want to delete ${title}?`,
      callbackfn: (confirmed: boolean) => {
        if (confirmed) {
          postsStore.deletePost(id)
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
    <div class="hero-head">
      <div class="container has-text-centered">
        <h1 class="title mt-3 has-text-white">Posts List</h1>
        <button class="button is-primary mt-3 is-rounded" @click="createPost">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span class="ml-1">Add New Post</span>
        </button>
        <Search :searchField="searchFields" @search="handleSearch"/>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <div v-if="isLoading" class="has-text-centered">Loading...</div>
        <div v-else>
          <div class="columns is-multiline">
            <PostCard :posts="posts">
              <template v-slot:edit-post="{ post }">
                <button class="button is-warning" @click="updatePost(post)">
                  <span class="icon is-small">
                    <i class="fas fa-edit"></i>
                  </span>
                  <span>Custom Edit</span>
                </button>
              </template>
              <template v-slot:delete-post="{ post }">
                <button class="button is-danger" @click="confirmDeletePost(post.id, post.title)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </template>
            </PostCard>
          </div>
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

.button {
  margin-bottom: 1rem;
  color: #FAF6F6;
}

.button.is-primary {
  background-color: #209CEE;
  border-color: #209CEE;
}

.button.is-warning {
  background-color: #F5A623;
  border-color: #F5A623;
}

.button.is-danger {
  background-color: #FF3860;
  border-color: #FF3860;
}

.button .icon {
  margin-right: 0.5rem;
}
</style>