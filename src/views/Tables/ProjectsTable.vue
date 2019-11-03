<template>
  <div class="card shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Request transaction</h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        tbody-classes="list"
        :data="data_noti"
      >
        <template slot="columns">
          <th>Sender</th>
          <th>Reciver</th>
          <th>amount</th>
          <th>Status</th>
          <th>Action</th>
        </template>

        <template slot-scope="{row}">
          <td scope="row">
            <div class="media align-items-center">
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a>-->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.sender_name}}</span>
              </div>
            </div>
          </td>

          <td>
            <div class="media-body">
              <span class="name mb-0 text-sm">{{row.reciver_name}}</span>
            </div>
          </td>

          <td class="budget">{{row.pt_amount}}</td>

          <td>
            <!-- <badge class="badge-dot mr-4" :type="row.statusType"> -->
            <!-- <i :class="`bg-${row.statusType}`"></i> -->
            <badge type="danger" v-show="!row.pst_read">New</badge>
            <span class="pt_status" v-if="row.pst_status==null">Pending</span>
            <span class="pt_status" v-if="row.pst_status==0">Reject</span>
            <span class="pt_status" v-if="row.pst_status==1">Accept</span>
            

            <!-- </badge> -->
          </td>

          <td>
            <div class="d-flex align-items-center">
              <base-button
                type="primary"
                icon="fas fa-info-circle"
                @click="select(row),modals.AcceptRequest = true"
                :disabled="row.pst_status!=null"
              ></base-button>

              <!-- <base-button type="warning" icon="fas fa-trash-alt"></base-button> -->
              <!-- <span class="completion mr-2">{{row.completion}}%</span> -->
              <div>
                <!-- <base-progress :type="row.statusType"
                               :show-percentage="false"
                               class="pt-0"
                :value="row.completion"/>-->
              </div>
            </div>
          </td>
        </template>
      </base-table>
    </div>

    <!-- //modal pull coin -->
    <modal :show.sync="modals.AcceptRequest">
      <template slot="header">
        <h3 class="modal-title" id="exampleModalLabel">Request Libra Coin</h3>
      </template>
      <div class="row">
        <div
          class="col-xl-12"
        >Sender : {{data_notii_index.sender_name==null ? '':data_notii_index.sender_name}}</div>
        <div
          class="col-xl-12"
        >Reciver : {{data_notii_index.reciver_name==null ? '':data_notii_index.reciver_name}}</div>
        <div class="col-xl-12"></div>
        <div class="col-xl-12"></div>
      </div>
      <template slot="footer">
        <base-button
          type="danger"
          @click="modals.AcceptRequest = false; accept_fun(data_notii_index,'0')"
        >Reject</base-button>
        <base-button
          type="success"
          @click="modals.AcceptRequest = false; accept_fun(data_notii_index,1);"
        >Accept</base-button>
      </template>
    </modal>
    <!-- //end modal pull coin -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "projects-table",
  props: {
    type: {
      type: String
    },
    title: String
  },
  data() {
    return {
      user_id: null,
      user_email: null,
      data_noti: null,
      data_notii_index: [],
      Mnemonic: localStorage.getItem("mnemonic"),
      modals: { AcceptRequest: false }
    };
  },
  methods: {
    getuserdata() {
      axios
        .post("http://localhost:3000/um/getuserbymnemonic", {
          mnemonic: this.Mnemonic
        })
        .then(res => {
          // console.log("sssss",res.data.data[0].us_id)
          this.user_id = res.data.data[0].us_id;
          this.user_email = res.data.data[0].us_email;
          // console.log(this.Email)
          this.getdatanoti();
        });
    },
    getdatanoti() {
      axios
        .post("http://localhost:3000/noti/get_data_noti", {
          id: this.user_id
        })
        .then(res => {
          // console.log("datanoti", res.data.result_data_noti);
          this.data_noti = res.data.result_data_noti;
        });
    },
    select(val) {
      if (val.pst_read == 0) {
        axios.post("http://localhost:3000/noti/update_reader_noti", {
          id: val.id
        });
        val.pst_read = 1;
      }
      this.data_notii_index = val;
    },
    accept_fun:async function(data, status_pt) {
      console.log(data,status_pt)
     await axios
        .post("http://localhost:3000/noti/update_user_status", {
          id: data.id,
          us_status: status_pt
        })
        .then(res => {
          this.check_accept_fun(data.pt_id,this.user_email);
          // console.log("update_user_status :",res);
        });
      data.pst_status = status_pt;
       
      this.data_notii_index = data;
    },
    check_accept_fun(pt_id,email) {
      axios
        .post("http://localhost:3000/noti/update_petiton_status", {
          id: pt_id,
          email : email
        })
        .then(res => {
          console.log(pt_id,"check_accept_fun :",res)
        });
    }
  },
  mounted() {},
  created() {
    this.getuserdata();
  }
};
</script>
<style>
</style>
