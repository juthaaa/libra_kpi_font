<template>
  <nav class="navbar navbar-vertical fixed-left navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <img :src="logo" class="navbar-brand-img" height="100%" width="50%" />
      </navbar-toggle-button>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">No</ul>
      </slot>

      <slot>
        <ul class="nav align-items-center d-md-none">No</ul>
      </slot>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/logo_bbt.png",
      description: "Sidebar app logo"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  }
};
</script>
