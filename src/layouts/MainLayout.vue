<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal bordered class="bg-green-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/hexLogo.svg" />
          </q-avatar>
          Excess Mileage Calculator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-form class="q-gutter-md">
          <q-input
            v-model="customer"
            filled
            label="Customer"
            hint="Customer Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="registration"
            filled
            label="Registration"
            hint="Vehicle Registration"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="vehicleType"
            filled
            label="Vehicle Type"
            hint="Vehicle Type"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="hireStart"
            label="Hire Start Date"
            hint="Hire Start Date"
            filled
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="hireStart"
                    title="Hire Start Date"
                    today-btn
                    color="green-10"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="green-10"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="hireEnd"
            label="Hire End Date"
            hint="Hire End Date"
            filled
            mask="date"
            :rules="[
              'date',
              //TODO: Ensure end cannot be earlier that start
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="hireEnd"
                    title="Hire End Date"
                    today-btn
                    color="green-10"
                  >
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="green-10"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            v-model="startMileage"
            type="number"
            filled
            label="Start Mileage"
            hint="Start Mileage"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="endMileage"
            type="number"
            filled
            label="End Mileage"
            hint="End Mileage"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              //TODO: Check Mileage is greater than start mileage
            ]"
          />
          <q-input
            v-model="yearlyAllowance"
            type="number"
            filled
            label="Yearly Allowance"
            hint="Yearly Allowance"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            v-model="pricePerExcess"
            type="number"
            filled
            label="Pence Per Excess Mile/KM"
            hint="Pence Per Excess Mile/KM"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div>
            <q-btn
              prevent
              label="Submit"
              type="submit"
              color="green-10"
              @click="addVehicleToArray"
            />
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
              <th class="text-left">Customer</th>
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
          <tbody v-for="vehicle in vehicleArray" :key="vehicle.id">
            <tr>
              <td>
                {{ vehicle.customer }}
              </td>
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
              <td
                @click="removeVehicleFromArray(vehicle.id)"
                class="cursor-pointer"
              >
                Remove
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";

export default {
  setup() {
    const customer = ref("");
    const registration = ref("");
    const vehicleType = ref("");
    const hireStart = ref("");
    const hireEnd = ref("");
    const startMileage = ref("");
    const endMileage = ref("");
    const yearlyAllowance = ref("");
    const excessMileage = ref("");
    const pricePerExcess = ref("7");
    const excessCharge = ref("");
    const vehicleArray = ref([
      {
        id: 1,
        customer: "DFDS",
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
        id: 2,
        customer: "Yusen",
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
    ]);

    const vehicleArrayID = vehicleArray.value.length + 1;

    function addVehicleToArray() {
      vehicleArray.value.push({
        id: vehicleArrayID,
        customer: customer.value,
        reg: registration.value,
        type: vehicleType.value,
        startDate: hireStart.value,
        endDate: hireEnd.value,
        startMileage: startMileage.value,
        endMileage: endMileage.value,
        allowance: yearlyAllowance.value,
        over: "coming soon",
        ppm: pricePerExcess.value,
        excessCharge: "coming soon",
      });
      vehicleArrayID++;
    }

    function removeVehicleFromArray(id) {
      vehicleArray.value.splice(id, 1);
    }

    return {
      vehicleArray,
      addVehicleToArray,
      removeVehicleFromArray,
      customer,
      registration,
      vehicleType,
      hireStart,
      hireEnd,
      startMileage,
      endMileage,
      yearlyAllowance,
      excessMileage,
      pricePerExcess,
      excessCharge,
    };
  },
};
</script>
