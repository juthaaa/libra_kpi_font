<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-6 col-lg-12">
          <div class="row">
            <div class="col-xl-12 col-lg-12">
              <!-- <stats-card
                title="My addess"
                type="gradient-green"
                :sub-title="this.Address"
                class="mb-4 mb-xl-0"
              >
                <template slot="footer">
                  <span class="text-success mr-2">
                    <i class="ni ni-circle-08"></i> 10 Member
                  </span>
                </template>
              </stats-card>-->
              <card type="frame">
                <div class="row">
                  <div class="col-xl-12">
                    <h2>My Profile</h2>
                    <hr />
                  </div>
                  <div class="col-xl-12">
                    <p>
                      <a style="font-weight: bold;">address :</a>
                      {{this.Address}}
                    </p>
                  </div>
                  <div class="col-xl-12">
                    <p>
                      <a style="font-weight: bold;">email :</a>
                      {{this.Email}}
                    </p>
                  </div>
                  <div class="col-xl-12">
                    <p>
                      <a style="font-weight: bold;">name :</a>
                      {{this.Name}}
                    </p>
                  </div>
                </div>
              </card>
            </div>
          </div>
        </div>

        <div class="col-xl-6 col-lg-12">
          <div class="row">
            <div class="col-xl-12 col-lg-12">
              <stats-card
                title="My Balance"
                type="gradient-red"
                :sub-title="Balance+' Libra'"
                icon="ni ni-money-coins"
                class="mb-4 mb-xl-0"
              >
                <!-- <template slot="footer">
                  <span class="text-success mr-2">
                    <i class="fa fa-arrow-up"></i> 10 Libra
                  </span>
                </template>-->
              </stats-card>
            </div>

            <div class="col-xl-12">
              <hr />
            </div>

            <div class="col-xl-12 col-lg-12">
              <card header-classes="bg-transparent">
                <div slot="header" class="row align-items-center">
                  <div class="col">
                    <h3 class="mb-0">Action</h3>
                  </div>
                </div>
                <base-button
                  type="primary"
                  icon="fa fa-exchange-alt"
                  @click="modals.transferCoin = true; getUserforModal();"
                >transfer</base-button>
                <base-button
                  type="primary"
                  icon="fa fa-coins"
                  @click="modals.requestCoin = true; getUserforModal();"
                >sent pull coin</base-button>
              </card>
            </div>
          </div>
        </div>
      </div>
      <!-- //modal reansfer -->
      <modal :show.sync="modals.transferCoin">
        <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">Transfer Libra Coin</h3>
        </template>
        <div class="row">
          <div class="col-xl-12">
            <base-input label="Receiver Name">
              <select class="form-control" v-model="transferCoin_form.reciever_address">
                <option
                  v-for="datas in data_modal"
                  v-show="datas.email!= Email"
                  :value="datas.address"
                  :key="datas.address"
                >{{datas.name}}</option>
              </select>
            </base-input>
          </div>
          <div class="col-xl-12">
            <base-input
              placeholder="Libra Coin"
              label="Amount"
              v-model="transferCoin_form.coin_transfer"
            ></base-input>
          </div>
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modals.transferCoin = false ">Close</base-button>
          <base-button type="primary" @click="modals.transferCoin = false; transfer_fun();">Transfer</base-button>
        </template>
      </modal>
      <!-- //end modal transfer -->

      <!-- //modal pull coin -->
      <modal :show.sync="modals.requestCoin">
        <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">Request Libra Coin</h3>
        </template>
        <div class="row">
          <div class="col-xl-12">
            <base-input label="Requested Person">
              <select class="form-control" v-model="requestCoin_form.reciver_id">
                <option
                  v-for="datas in data_modal"
                  v-show="datas.email!= Email"
                  :value="datas.us_id"
                  :key="datas.us_idd"
                >{{datas.name}}</option>
              </select>
            </base-input>
          </div>
          <div class="col-xl-12">
            <base-input
              placeholder="Libra Coin"
              label="Amount"
              v-model="requestCoin_form.coin_request"
            ></base-input>
          </div>
          <div class="col-xl-12">
            <base-input
              placeholder="detail"
              label="Reason"
              v-model="requestCoin_form.detail_request"
            ></base-input>
          </div>
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modals.requestCoin = false">Close</base-button>
          <base-button
            type="primary"
            @click="modals.requestCoin = false; sent_request_fun();"
          >Sent Request</base-button>
        </template>
      </modal>
      <!-- //end modal pull coin -->
    </base-header>

    <div class="container-fluid mt--7">
      <!--Tables-->

      <div class="row mt-5">
        <!-- //table balance -->
        <div class="col-xl-12 mb-5 mb-xl-0">
          <div class="card">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Balance Member</h3>
                </div>
                <!-- <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
                </div>-->
              </div>
            </div>

            <div class="table-responsive">
              <base-table thead-classes="thead-light" :data="datas_balance">
                <template slot="columns">
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Address</th>
                  <th>Balance</th>
                </template>

                <template slot-scope="{row}">
                  <td>{{row.name}}</td>
                  <th >{{row.email}}</th>
                  <td>{{row.address}}</td>
                  <td>
                    <!-- <i class="fas fa-arrow-up text-success mr-3"
               :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
                    </i>-->
                    {{row.balance}}
                  </td>
                </template>
              </base-table>
            </div>
          </div>
        </div>
        <!-- end table balance -->

        <!-- table traffic -->
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Transaction Traffic</h3>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <base-table thead-classes="thead-light" :data="datas_traffic">
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
                      <span  v-if="row.pt_status==3"><i :class="`bg-danger`"></i>No result({{row.Accept}}/{{row.Reject}})</span>
                      <span  v-if="row.pt_status==0"><i :class="`bg-warning`"></i>Pending({{row.Accept}}/{{row.Reject}})</span>
                    </badge>
                  </td>
                </template>
              </base-table>
            </div>
          </div>
        </div>
        <!-- end table traffic -->
      </div>

      <!--End tables-->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
const axios = require("axios");
// Tables
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageBalanceTable from "./Dashboard/PageBalanceTable";
import { asyncLoading } from "vuejs-loading-plugin";
// import { async } from 'q';
// import { log } from 'util';

export default {
  components: {
    PageBalanceTable,
    SocialTrafficTable
  },
  data() {
    return {
      modals: {
        transferCoin: false,
        requestCoin: false
      },
      Balance: null,
      Email: null,
      Name: null,
      us_id: null,
      Address: localStorage.getItem("address"),
      Mnemonic: localStorage.getItem("mnemonic"),
      transferCoin_form: {
        reciever_address: null,
        coin_transfer: null
      },
      requestCoin_form: {
        reciver_id: null,
        coin_request: null,
        detail_request: null
      },
      datas_balance: [],
      datas_traffic: [],
      data_modal: []
    };
  },
  methods: {
    getBalance: async function() {
      // console.log(vm.Address);
      axios
        .post("http://localhost:3000/libraserv/getbalance", {
          address: this.Address
        })
        .then(res => {
          // console.log("test :", res.data);
          this.Balance = res.data.balance; //convert micorlibra => libra
        });
    },
    getuserdata() {
      axios
        .post("http://localhost:3000/um/getuserbymnemonic", {
          mnemonic: this.Mnemonic
        })
        .then(res => {
          // console.log(res.data.data[0].us_email)
          this.us_id = res.data.data[0].us_id;
          this.Email = res.data.data[0].us_email;
          this.Name =
            res.data.data[0].us_fname + "  " + res.data.data[0].us_lname;
          // console.log(this.Email)
        });
    },
    getUserforModal() {
      axios.get("http://localhost:3000/um/getforUserModal").then(res => {
        this.data_modal = res.data.data;
        // console.log(this.data_modal);
      });
    },
    transfer_fun: async function() {
      await axios
        .post("http://localhost:3000/LibraServ/transfer", {
          username: this.Email,
          address_receive: this.transferCoin_form.reciever_address,
          coin_amount: this.transferCoin_form.coin_transfer,
          address_sender: this.Address
        })
        .then(res => {
          // console.log(res)

          if (res.data.status_text == "success") {
            this.$notify({ type: "success", message: "transfer success" });
            this.Balance = this.Balance - this.transferCoin_form.coin_transfer;
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        });
      await this.getdata_Tbalance();
    },
    sent_request_fun() {
      console.log("sent Request to member");
      axios
        .post("http://localhost:3000/noti/createpetition", {
          sender: this.us_id,
          reciver: this.requestCoin_form.reciver_id,
          amount: this.requestCoin_form.coin_request,
          description: this.requestCoin_form.detail_request
        })
        .then(res => {
          this.$notify({ type: "success", message: "Sent request success" });
          console.log(res);
        });
    },
    getdata_Tbalance() {
      let vm = this;
      const load_data = new Promise(() => {
        axios
          .post("http://localhost:3000/um/getforTableBalance", {
            address: this.address
          })
          .then(res => {
            this.datas_balance = res.data.datas;
            vm.$loading(false);
          })
          .catch(vm.$loading(false));
      });
      asyncLoading(load_data);
    },
    getdata_Ttraffic() {
      let vm = this;
      const load_data = new Promise(() => {
        axios
          .get("http://localhost:3000/noti/get_data_dash")
          .then(res => {
            this.datas_traffic = res.data.result_data_dash;
            console.log(res.data.result_data_dash);
            vm.$loading(false);
          })
          .catch(vm.$loading(false));
      });
      asyncLoading(load_data);
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.getBalance();
    this.getuserdata();
    this.getdata_Tbalance();
    this.getdata_Ttraffic();
  }
};
</script>
<style></style>
