<template>
  <base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="false" expand>
    <div class="mr-3 d-none d-md-flex ml-lg-auto">
      <!-- <router-link to="/notifications" class="dropdown-item"> -->
      <base-button
        type="primary"
        icon="ni ni-bell-55"
        @click="go_to_notification"
      >Request Transaction</base-button>
      <!-- </router-link> -->
      <!-- </div>
      <div class="mr-3 d-none d-md-flex ml-lg-auto">-->
      <base-button type="primary" icon="ni ni-bell-55" @click="go_to_myTransaction">My Transaction</base-button>
    </div>

    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <router-link to="/login" class="dropdown-item">
          <span style="color:white;">Logout</span>
        </router-link>
      </li>
    </ul>
  </base-nav>
</template>
<script>
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: ""
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    go_to_notification() {
      this.$router.push({
        path: "/notifications",
        name: "notifications"
      });
    },
    go_to_myTransaction() {
      this.$router.push({
        path: "/mytransaction",
        name: "mytransaction"
      });
    }
  }
};
</script>
