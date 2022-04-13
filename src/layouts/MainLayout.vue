<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal bordered class="bg-green-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="src\assets\Hex Lease No Text 2.png" />
          </q-avatar>
          Excess Mileage Calculator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-form class="q-gutter-md">
          <q-input
            filled
            label="Your name *"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="number"
            label="Your age *"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />

          <!-- <q-toggle label="Miles/KMs" /> -->

          <div>
            <q-btn label="Submit" type="submit" color="green-10" />
            <q-btn
              label="Reset"
              type="reset"
              color="green-10"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Vehicle Registration</th>
              <th class="text-left">Vehicle Type</th>
              <th class="text-left">Hire Start Date</th>
              <th class="text-left">Hire End Date</th>
              <th class="text-left">Start Mileage</th>
              <th class="text-left">End Mileage</th>
              <th class="text-left">Yearly Allowance</th>
              <th class="text-left">Over</th>
              <th class="text-left">Pence per Mile Over</th>
              <th class="text-left">Excess Mielage Charge</th>
            </tr>
          </thead>
          <tbody v-for="vehicle in vehicleArray" :key="vehicle.reg">
            <tr>
              <td>
                {{ vehicle.reg }}
              </td>
              <td>
                {{ vehicle.type }}
              </td>
              <td>
                {{ vehicle.startDate }}
              </td>
              <td>
                {{ vehicle.endDate }}
              </td>
              <td>
                {{ vehicle.startMileage }}
              </td>
              <td>
                {{ vehicle.endMileage }}
              </td>
              <td>
                {{ vehicle.allowance }}
              </td>
              <td>
                {{ vehicle.over }}
              </td>
              <td>
                {{ vehicle.ppm }}
              </td>
              <td>
                {{ vehicle.excessCharge }}
              </td>
              <td @click="remove(vehicle.reg)">Remove</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const registration = ref("");
    const vehicleType = ref("");
    const hireStart = ref("");
    const hireEnd = ref("");
    const startMileage = ref("");
    const endMileage = ref("");
    const yearlyAllowance = ref("");
    const excessMileage = ref("");
    const pricePerExcess = ref("");
    const excessCharge = ref("");
    const vehicleArray = [
      {
        reg: "DX12AEA",
        type: "Tractor Unit",
        startDate: "01/01/2022",
        endDate: "02/01/2022",
        startMileage: "123456",
        endMileage: "7891011",
        allowance: "150000",
        over: "10",
        ppm: "0.7",
        excessCharge: "70",
      },
      {
        reg: "DX12AEB",
        type: "Tractor Unit 6x2",
        startDate: "03/01/2022",
        endDate: "04/01/2022",
        startMileage: "7891011",
        endMileage: "1234567",
        allowance: "1140000",
        over: "11",
        ppm: "0.08",
        excessCharge: "88",
      },
    ];

    function remove(reg) {
      console.log(`Clicked: ${reg}`);
    }

    return { vehicleArray, remove };
  },
};
</script>
