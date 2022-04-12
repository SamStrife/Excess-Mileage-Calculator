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

          <q-toggle label="I accept the license and terms" />

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
              <th class="text-right">Vehicle Type</th>
              <th class="text-right">Hire Start Date</th>
              <th class="text-right">Hire End Date</th>
              <th class="text-right">Start Mileage</th>
              <th class="text-right">End Mileage</th>
              <th class="text-right">Yearly Allowance</th>
              <th class="text-right">Over</th>
              <th class="text-right">Pence per Mile Over</th>
              <th class="text-right">Excess Mielage Charge</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-page-container>
  </q-layout>
</template>
