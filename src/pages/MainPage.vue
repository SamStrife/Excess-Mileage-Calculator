<template>
  <q-layout view="hhh LpR fFf">
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
        <q-form class="q-gutter-md" greedy>
          <div class="row q-gutter-md">
            <div class="col">
              <q-input
                v-model="customer"
                dense
                outlined
                label="Customer"
                hint="Customer Name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div class="col">
              <q-input
                v-model="registration"
                outlined
                dense
                label="Registration"
                hint="Vehicle Registration"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div class="col">
              <q-input
                v-model="vehicleType"
                outlined
                dense
                label="Vehicle Type"
                hint="Vehicle Type"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <q-input
                v-model="hireStart"
                label="Hire Start Date"
                hint="Hire Start Date"
                outlined
                dense
                mask="##/##/####"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
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
                        v-model="hireStart"
                        title="Hire Start Date"
                        mask="DD/MM/YYYY"
                        subtitle=" "
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
            </div>
            <div class="col">
              <q-input
                v-model="hireEnd"
                label="Hire End Date"
                hint="Hire End Date"
                outlined
                dense
                mask="##/##/####"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
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
                        mask="DD/MM/YYYY"
                        subtitle=" "
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
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <q-input
                id="startMileageInput"
                v-model="startMileage"
                type="number"
                outlined
                dense
                label="Start Mileage"
                hint="Start Mileage"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div class="col">
              <q-input
                v-model="endMileage"
                type="number"
                outlined
                dense
                label="End Mileage"
                hint="End Mileage"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <q-input
                v-model="yearlyAllowance"
                type="number"
                outlined
                dense
                label="Yearly Allowance"
                hint="Yearly Allowance"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
            <div class="col">
              <q-input
                v-model="pricePerExcess"
                type="number"
                outlined
                dense
                label="Pence Per Excess Mile/KM"
                hint="Pence Per Excess Mile/KM"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
            </div>
          </div>
          <div class="row justify-start">
            <div class="col-1 col-md-1">
              <q-btn
                prevent
                label="Add"
                color="green-10"
                @click="addVehicleToArray"
              />
            </div>
            <div class="col">
              <q-btn
                label="Clear"
                type="reset"
                color="green-10"
                flat
                class="q-ml-sm"
                @click="clearInput"
              />
            </div>
            <div class="col">
              <q-toggle
                v-model="preventNegative"
                color="green"
                label="Prevent Negative Results"
              />
            </div>
          </div>
        </q-form>
      </div>
      <div class="q-pa-md">
        <q-markup-table id="mileageTable">
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
              <th class="text-left">Pence per KM</th>
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
              <td>{{ vehicle.excessCharge }}</td>
              <td>
                <q-icon
                  class="text-red cursor-pointer"
                  name="clear"
                  @click="removeVehicleFromArray(vehicle)"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="q-pa-md q-gutter-md">
          <div>
            <q-chip
              clickable
              @click="downloadTable"
              icon="file_download"
              color="green-10"
              text-color="white"
              >Download</q-chip
            >
            <q-chip
              clickable
              @click="clearTable"
              icon="delete_forever"
              color="green-10"
              text-color="white"
              >Clear Table</q-chip
            >
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";
import * as XLSX from "xlsx";

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
    const vehicleArray = ref([]);
    const preventNegative = ref(false);
    let vehicleArrayID = vehicleArray.value.length + 1;

    function numberWithCommas(number, currencyMode = false) {
      let rounded = currencyMode
        ? number.toFixed(2)
        : Math.round(parseInt(number));
      return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function excessCalc(preventNeg) {
      let dailyAllowance = yearlyAllowance.value / 365;
      let daysOnRent = date.getDateDiff(hireEnd.value, hireStart.value, "days");
      let milesDone = endMileage.value - startMileage.value;
      let hireAllowance = dailyAllowance * daysOnRent;
      let mileageDifference = milesDone - hireAllowance;

      preventNeg && mileageDifference < 0
        ? (mileageDifference = 0)
        : mileageDifference;

      return {
        difference: mileageDifference,
        cost: (mileageDifference * pricePerExcess.value) / 100,
      };
    }

    function addVehicleToArray() {
      let calculation = excessCalc(preventNegative.value);

      vehicleArray.value.push({
        id: vehicleArrayID,
        customer: customer.value,
        reg: registration.value,
        type: vehicleType.value,
        startDate: hireStart.value,
        endDate: hireEnd.value,
        startMileage: numberWithCommas(startMileage.value),
        endMileage: numberWithCommas(endMileage.value),
        allowance: numberWithCommas(yearlyAllowance.value),
        over: numberWithCommas(calculation.difference),
        ppm: pricePerExcess.value,
        excessCharge: "£" + numberWithCommas(calculation.cost, true),
      });
      vehicleArrayID++;
    }

    function downloadTable() {
      const workbook = XLSX.utils.book_new();
      let obj = vehicleArray.value.map((x) => {
        let y = JSON.parse(JSON.stringify(x));
        delete y.id;
        return y;
      });
      let ws = XLSX.utils.json_to_sheet(obj, {
        header: [
          "customer",
          "reg",
          "type",
          "startDate",
          "endDate",
          "startMileage",
          "endMileage",
          "allowance",
          "over",
          "ppm",
          "excessCharge",
        ],
      });
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            "Customer",
            "Registration",
            "Vehicle Type",
            "Hire Start Date",
            "Hire End Date",
            "Starting Mileage",
            "End Mileage",
            "Yearly Allowance",
            "Over",
            "Pence Per KM",
            "Excess Mileage Charge",
          ],
        ],
        { origin: "A1" }
      );
      XLSX.utils.book_append_sheet(workbook, ws, "Sheet 1");
      XLSX.writeFileXLSX(workbook, "Report.xlsx");
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
    }

    function clearTable() {
      vehicleArray.value = [];
    }

    return {
      vehicleArray,
      addVehicleToArray,
      removeVehicleFromArray,
      clearInput,
      clearTable,
      downloadTable,
      numberWithCommas,
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
      preventNegative,
    };
  },
};
</script>
