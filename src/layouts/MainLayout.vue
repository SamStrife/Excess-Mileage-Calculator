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
        <q-form class="q-gutter-md row items-start">
          <q-input
            v-model="customer"
            dense
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
            dense
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
            dense
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
            dense
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
            dense
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
            dense
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
            dense
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
            dense
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
            dense
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
              label="Add"
              type="submit"
              color="green-10"
              @click="addVehicleToArray"
            />
            <q-btn
              label="Clear"
              type="reset"
              color="green-10"
              flat
              class="q-ml-sm"
              @click="clearInput"
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
                @click="removeVehicleFromArray(vehicle)"
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
    const vehicleArray = ref([]);

    let vehicleArrayID = vehicleArray.value.length + 1;

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

    function removeVehicleFromArray(arrayVehicle) {
      vehicleArray.value = vehicleArray.value.filter(
        (vehicle) => vehicle.id != arrayVehicle.id
      );
    }

    function clearInput() {
      customer.value = "";
      registration.value = "";
      vehicleType.value = "";
      hireStart.value = "";
      hireEnd.value = "";
      startMileage.value = "";
      endMileage.value = "";
      yearlyAllowance.value = "";
      excessMileage.value = "";
      pricePerExcess.value = "7";
      excessCharge.value = "";
    }

    return {
      vehicleArray,
      addVehicleToArray,
      removeVehicleFromArray,
      clearInput,
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
