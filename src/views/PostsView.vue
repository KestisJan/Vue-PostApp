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
        <button class="button" @click="createPost">Add new Post</button>
        <Search @search="handleSearch" />
        <PostCard :posts="posts">
            <template v-slot:edit-post="{ post }">
                <button class="button" @click="updatePost(post.id)">Edit</button>
            </template>
            <template v-slot:delete-post="{ post }">
              <button class="button" @click="confirmDeletePost(post.id, post.title)">Delete</button>
            </template>
        </PostCard>
        <Pagination 
            :total-items="itemCount"
            @update="handlePagination"
        />
        <Modal />
    </div>
</template>


<style scoped>

</style>