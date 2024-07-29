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
        <h1 class="title mt-4 has-text-white">Posts List</h1>
        <button class="button is-primary mt-4 is-rounded" @click="createPost">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span class="ml-1">Add New Post</span>
        </button>
        <Search @search="handleSearch"/>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <div v-if="isLoading" class="has-text-centered">Loading...</div>
        <div v-else>
          <div class="columns is-multiline">
            <PostCard :posts="posts">
              <template v-slot:default="{ post }">
                <div class="column is-one-third">
                  <div class="post-card card">
                    <div class="card-content">
                      <p class="title">{{ post.title }}</p>
                      <p class="subtitle">{{ post.body }}</p>
                    </div>
                    <footer class="card-footer">
                      <slot name="edit-post" :post="post">
                        <button class="button is-info" @click="updatePost(post.id)">
                          <i class="fas fa-edit"></i> Edit
                        </button>
                      </slot>
                      <slot name="delete-post" :post="post">
                        <button class="button is-danger" @click="confirmDeletePost(post.id, post.title)">
                          <i class="fas fa-trash"></i> Delete
                        </button>
                      </slot>
                    </footer>
                  </div>
                </div>
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
  background-color: #0B132B;
  border-color: #0B132B;
}

.button.is-primary:hover {
  background-color: #1C2541;
  border-color: #1C2541;
}

.button.is-warning {
  background-color: #1C2541;
  border-color: #1C2541;
  color: #FAF6F6;
}

.button.is-warning:hover {
  background-color: #0B132B;
  border-color: #0B132B;
}

.button.is-danger {
  background-color: #1C2541;
  border-color: #1C2541;
  color: #FAF6F6;
}

.button.is-danger:hover {
  background-color: #0B132B;
  border-color: #0B132B;
}
</style>