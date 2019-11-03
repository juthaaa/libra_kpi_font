<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <router-link to="/dashboard" class="dropdown-item">
        <a style="color:white; font-weight: bold;"> Back</a>
      </router-link>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table title="notification"></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from "./Tables/ProjectsTable";
export default {
  name: "tables",
  components: {
    ProjectsTable
  }
};
</script>
<style></style>
