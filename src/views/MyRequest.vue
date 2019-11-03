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
          <div class="card shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">My Transaction</h3>
        </div>
      </div>
    </div>

    <div class="card">
           

            <div class="table-responsive">
              <base-table thead-classes="thead-light" :data="data_noti">
                <template slot="columns">
                  <th>name sender</th>
                  <th>name recieve</th>
                  <th>balance</th>
                  <th>status(Accept/Reject)</th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.sender_name}}</th>
                  <td>{{row.reciver_name}}</td>
                  <td>{{row.pt_amount}}</td>
                  <td>
                    <badge class="badge-dot mr-4" :type="success">
                      <span  v-if="row.pt_status==1"><i :class="`bg-success`"></i>Accept({{row.Accept}}/{{row.Reject}})</span>
                      <span  v-if="row.pt_status==2"><i :class="`bg-danger`"></i>Reject({{row.Accept}}/{{row.Reject}})</span>
                      <span  v-if="row.pt_status==0"><i :class="`bg-warning`"></i>Pending({{row.Accept}}/{{row.Reject}})</span>
                    </badge>
                  </td>
                </template>
              </base-table>
            </div>
          </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from "./Tables/ProjectsTable";
import axios from "axios";
export default {
  name: "tables",
  components: {
    ProjectsTable
  },
  data(){
    return{
      user_id: null,
      data_noti: null,
      data_notii_index: [],
      Mnemonic: localStorage.getItem("mnemonic")
    }
  },
  methods:{
    getuserdata() {
      axios
        .post("http://localhost:3000/um/getuserbymnemonic", {
          mnemonic: this.Mnemonic
        })
        .then(res => {
          // console.log("sssss",res.data.data[0].us_id)
          this.user_id = res.data.data[0].us_id;
          // console.log(this.Email)
          this.getdataMytransaction();
        });
    },
    getdataMytransaction(){
      axios.post('http://localhost:3000/noti/get_data_mytracsaction',{
        id : this.user_id
      })
      .then(res => {
        console.log("datanoti",res.data.result_data_mytran)
        this.data_noti = res.data.result_data_mytran
      })
    }
  },
  created(){
     this.getuserdata();
  }
};
</script>
<style></style>
