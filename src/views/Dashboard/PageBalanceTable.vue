<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Balance Member</h3>
        </div>
        <!-- <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </div> -->
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="datas">
        <template slot="columns">
          <th>name</th>
          <th>address</th>
          <th>balance</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.email}}
          </th>
          <td>
            {{row.address}}
          </td>
          <td>
            <!-- <i class="fas fa-arrow-up text-success mr-3"
               :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
            </i> -->
            {{row.balance}}
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
const axios = require("axios");
import { asyncLoading } from "vuejs-loading-plugin";

  export default {
    name: 'page-balance-table',
    data() {
      return {
        tableData: [
          {
            page: '/argon/',
            visitors: '37a548fe8554d5554b4115',
            unique: '340',
            bounceRate: '25300',
            bounceRateDirection: 'up'
          },
          {
            page: '/argon/index.html',
            visitors: '37a548fe8554d5554b4115',
            unique: '319',
            bounceRate: '4352',
            bounceRateDirection: 'down'
          },
          {
            page: '/argon/charts.html',
            visitors: '37a548fe8554d5554b4115',
            unique: '294',
            bounceRate: '9547',
            bounceRateDirection: 'down'
          },
          {
            page: '/argon/tables.html',
            visitors: '37a548fe8554d5554b4115',
            unique: '147',
            bounceRate: '12',
            bounceRateDirection: 'up'
          },
          {
            page: '/argon/profile.html',
            visitors: '37a548fe8554d5554b4115',
            unique: '190',
            bounceRate: '352',
            bounceRateDirection: 'down'
          }
        ],
        address: localStorage.getItem('address'),
        datas: [],
      }
    },
    created(){
      let vm = this;
      const load_data = new Promise(() => {

        axios
          .post("http://localhost:3000/um/getforTableBalance", {
            address: this.address
          })
          .then(res => {
            this.datas = res.data.datas
            vm.$loading(false);

          })
          .catch(vm.$loading(false));

      });
      asyncLoading(load_data);

    }
  }
</script>
<style>
</style>
