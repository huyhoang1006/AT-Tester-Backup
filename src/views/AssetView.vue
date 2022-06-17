<template>
  <div id="manage">
    <el-row class="top-bar">
      <el-col :span="24">
        <el-button
          @click="backToManage"
          style="box-sizing: border-box; border-right: 1px solid #aeb6bf"
        >
          <i class="fa-solid fa-circle-arrow-left display-block fa-2x"></i>
          <div class="mgt-10">Manage</div>
        </el-button>
        <el-button @click="saveAsset('ruleForm')">
          <i class="fa-solid fa-floppy-disk display-block fa-2x"></i>
          <div class="mgt-10">Save Asset</div>
        </el-button>
        <el-button
          @click="deleteLocation"
          style="box-sizing: border-box"
          :disabled="mode === 'add'"
        >
          <i
            class="fa-solid fa-xmark display-block fa-2x"
            style="color: #f56c6c"
          ></i>
          <div class="mgt-10">Delete</div>
        </el-button>
      </el-col>
    </el-row>

    <el-tabs type="card" class="mgt-10">
      <!-- Transformer -->
      <el-tab-pane label="Transformer">
        
        <!-- Properties -->
        <el-row :gutter="20" class="content">
          <el-col :span="8" class="col-content">
            <el-form
              :inline-message="true"
              label-width="140px"
              size="mini"
              label-position="left"
            >
              <span style="font-weight: bolder">Properties</span>
              <el-divider></el-divider>
              <el-form-item label="Asset">
                <el-input
                  :disabled="true"
                  v-model="asset.properties.asset"
                ></el-input>
              </el-form-item>
              <el-form-item label="Asset type">
                <el-select
                  v-model="asset.properties.asset_type"
                  placeholder="Select asset type"
                >
                  <el-option label="Two-winding" value="Two-winding">
                  </el-option>
                  <el-option label="Three-winding" value="Three-winding">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Serial no.">
                <el-input v-model="asset.properties.serial_no"></el-input>
              </el-form-item>
              <el-form-item label="Manufactory">
                <el-input v-model="asset.properties.manufacture"></el-input>
              </el-form-item>
              <el-form-item label="Manufactory type">
                <el-input
                  v-model="asset.properties.manufacture_type"
                ></el-input>
              </el-form-item>
              <el-form-item label="Manufactory year">
                <el-input
                  v-model="asset.properties.manufacture_year"
                ></el-input>
              </el-form-item>
              <el-form-item label="Asset system code">
                <el-input
                  v-model="asset.properties.asset_system_code"
                ></el-input>
              </el-form-item>
              <el-form-item label="Apparatus ID">
                <el-input v-model="asset.properties.apparatus_id"></el-input>
              </el-form-item>
              <el-form-item label="Feeder">
                <el-input v-model="asset.properties.feeder"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8" class="col-content">
            <el-form
              label-width="140px"
              size="mini"
              label-position="left"
            >
              <span style="font-weight: bolder">Comment</span>
              <el-divider></el-divider>
              <el-input
                type="textarea"
                :rows="14"
                v-model="asset.comment"
              ></el-input>
            </el-form>
          </el-col>
        </el-row>

        <!-- Winding configuration -->
        <div id="winding-configuration" class="mgy-5">
          <el-row>
            <el-col :span="24">
              <div
                class="header-toggle pointer"
                @click="openWindingConfiguration = !openWindingConfiguration"
              >
                <i
                  v-if="openWindingConfiguration"
                  class="fa-solid fa-caret-up"
                ></i>
                <i v-else class="fa-solid fa-caret-down"></i>
                Winding configuration
              </div></el-col
            ></el-row>

          <div class="content-toggle" v-if="openWindingConfiguration">
            <el-row :gutter="20" class="content">
              <el-col :span="8" class="col-content">
                <el-form
                  :inline-message="true"
                  label-width="140px"
                  size="mini"
                  label-position="left"
                >
                  <el-form-item label="Phases">
                    <el-radio-group v-model="asset.winding_configuration.phases">
                      <el-radio label="1"></el-radio>
                      <el-radio label="3"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <div><b>n/a</b></div>
                    <el-button style="border: 1px solid #; width: 100%" @click="openDialog = true">
                      Select winding configuration
                    </el-button>
                    <div>Unsupported vector group</div>
                    <el-input
                      size="mini"
                      v-model="asset.winding_configuration.unsupported_vector_group"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Ratings -->
        <div id="ratings" class="mgy-5">
          <el-row>
            <el-col :span="24">
              <div
                class="header-toggle pointer"
                @click="openRatings = !openRatings"
              >
                <i v-if="openRatings" class="fa-solid fa-caret-up"></i>
                <i v-else class="fa-solid fa-caret-down"></i>
                Ratings
              </div></el-col
            >
          </el-row>
          <div class="content-toggle" v-if="openRatings">
            <!-- rated frequency -->
            <el-row :gutter="20" class="content">
              <el-col :span="8" class="col-content">
                <el-form
                  :inline-message="true"
                  label-width="140px"
                  size="mini"
                  label-position="left"
                >
                  <el-form-item label="Rated frequency">
                    <el-col :span="12">
                      <el-select v-model="asset.ratings.rated_frequency">
                        <el-option label="Custom" value="Custom"></el-option>
                        <el-option label="60Hz" value="60"></el-option>
                        <el-option label="50Hz" value="50"></el-option>
                        <el-option label="16.7Hz" value="16.7"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="12" v-if="asset.ratings.rated_frequency==='Custom'">
                      <el-input v-model="asset.ratings.rated_frequency_custom">
                        <template slot="append">Hz</template>
                      </el-input>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

            <!-- voltage ratings -->
            <el-row :gutter="20" class="content">
              <el-col :span="16" class="col-content">
                <span style="font-weight: bolder">Voltage ratings</span>
                <el-divider></el-divider>
                <table class="w-100 mgt-5">
                  <tr>
                    <th>Winding</th>
                    <th>Voltage L-L</th>
                    <th>Voltage L-N*</th>
                    <th>Insul. level L-L(BIL)</th>
                    <th>Comments</th>
                  </tr>
                  <tr>
                    <td>Prim</td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.prim.voltage_ll" >
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.prim.voltage_ln"  :disabled="true">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.prim.insul_level_ll">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.prim.comment"> </el-input>
                    </td>
                  </tr>
                  <tr>
                    <td>Sec</td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.sec.voltage_ll">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.sec.voltage_ln" :disabled="true">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.sec.insul_level_ll">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.sec.comment"> </el-input>
                    </td>
                  </tr>
                  <tr v-if="asset.properties.asset_type==='Three-winding'">
                    <td>Tert</td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.tert.voltage_ll">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.tert.voltage_ln" :disabled="true">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.tert.insul_level_ll">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.voltage_ratings.tert.comment"> </el-input>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>

            <!-- power ratings -->
            <el-row :gutter="20" class="content">
              <el-col :span="16" class="col-content">
                <span style="font-weight: bolder">Power ratings</span>
                <el-divider></el-divider>
                <el-row :gutter="20" class="mgt-10">
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.ratings.power_ratings.push({
                      rated_power: '',
                      cooling_class: '',
                      temp_rise_wind: ''
                    })">
                      <i class="fas fa-plus"></i> Add power rating
                    </el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.ratings.power_ratings=[]">
                      <i class="fas fa-xmark"></i>
                      Remove all power rating
                    </el-button>
                  </el-col>
                </el-row>
                <table class="w-100 mgt-5">
                  <tr>
                    <th style="width: 33.33%">Rated power</th>
                    <th style="width: 33.33%">Cooling class</th>
                    <th style="width: 33.33%">Temp. rise wind.</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item, index) in asset.ratings.power_ratings" :key="index">
                    <td>
                      <el-input size="mini" v-model="item.rated_power">
                        <template slot="append">MVA</template>
                      </el-input>
                    </td>
                    <td>
                      <el-select size="mini" v-model="item.cooling_class">
                        <el-option label="ONAN" value="ONAN"></el-option>
                        <el-option label="ONAF" value="ONAF"></el-option>
                        <el-option label="OFAF" value="OFAF"></el-option>
                        <el-option label="OFWF" value="OFWF"></el-option>
                        <el-option label="ODAF" value="ODAF"></el-option>
                        <el-option label="ODWF" value="ODWF"></el-option>
                        <el-option label="OA" value="OA"></el-option>
                        <el-option label="FA" value="FA"></el-option>
                        <el-option label="FOA" value="FOA"></el-option>
                        <el-option label="FOW" value="FOW"></el-option>
                        <el-option label="OW" value="OW"></el-option>
                        <el-option label="ON" value="ON"></el-option>
                        <el-option label="OF" value="OF"></el-option>
                        <el-option label="AN" value="AN"></el-option>
                        <el-option label="AF" value="AF"></el-option>

                      </el-select>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.temp_rise_wind"> </el-input>
                    </td>
                    <td>
                      <el-button size="mini" type="danger" class="w-100"
                        @click="asset.ratings.power_ratings.splice(index, 1)">
                          <i class="fas fa-trash"></i>
                          Delete
                      </el-button>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>

            <!-- current ratings -->
            <el-row :gutter="20" class="content">
              <el-col :span="16" class="col-content">
                <span style="font-weight: bolder">Current ratings at rated power</span>
                <el-divider></el-divider>
                <table class="w-100 mgt-5">
                  <tr>
                    <th>Prim</th>
                    <th>Sec</th>
                    <th v-if="asset.properties.asset_type==='Three-winding'">Tert</th>
                    <th>Rated power</th>
                  </tr>
                  <tr>
                    <td>
                      <el-input size="mini"  v-model="asset.ratings.current_ratings.prim">
                        <template slot="append">A</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="asset.ratings.current_ratings.sec">
                        <template slot="append">A</template>
                      </el-input>
                    </td>
                    <td v-if="asset.properties.asset_type==='Three-winding'">
                      <el-input size="mini" v-model="asset.ratings.current_ratings.tert">
                        <template slot="append">A</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" value="MVA" :disabled="true"> </el-input>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>

            <!-- short-circuit -->
            <el-row :gutter="20" class="content">
              <el-col :span="8" class="col-content">
                <span style="font-weight: bolder">Short-circuit rating</span>
                <el-divider></el-divider>
                <el-form
                  :inline-message="true"
                  label-width="140px"
                  size="mini"
                  label-position="left"
                >
                  <el-form-item label="Max short-circuit current">
                    <el-col :span="12">
                      <el-form-item>
                        <el-input v-model="asset.ratings.short_circuit.ka" style="width: 100%">
                          <template slot="append">kA</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item>
                        <el-input v-model="asset.ratings.short_circuit.s" style="width: 100%">
                          <template slot="append">s</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Impedances -->
        <div id="impedances" class="mgy-5">
          <el-row>
            <el-col :span="24">
              <div
                class="header-toggle pointer"
                @click="openImpedances = !openImpedances"
              >
                <i v-if="openImpedances" class="fa-solid fa-caret-up"></i>
                <i v-else class="fa-solid fa-caret-down"></i>
                Impedances
              </div></el-col
            >
          </el-row>
          <div class="content-toggle" v-if="openImpedances">
            <!-- ref temp -->
            <el-row :gutter="20" class="content">
              <el-col :span="8" class="col-content">
                <el-form
                  :inline-message="true"
                  label-width="140px"
                  size="mini"
                  label-position="left"
                >
                  <el-form-item label="Ref. temp">
                    <el-input v-model="asset.impedances.ref_temp">
                      <template slot="append">°C</template>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>

            <!-- prim-sec -->
            <el-row :gutter="20" class="content">
              <el-col :span="16" class="col-content">
                <span style="font-weight: bolder"
                  >Short-circuit impedance Prim-Sec</span
                >
                <el-divider></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.impedances.prim_sec.push({
                      short_circuit_impedances_uk: '',
                      base_power: '',
                      base_voltage: '',
                      load_losses_pk: '',
                      oltc_position: '',
                      detc_position: ''
                    })">
                      <i class="fas fa-plus"></i> Add uk (%)
                      </el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.impedances.prim_sec=[]">
                      <i class="fas fa-xmark"></i>
                      Remove all uk (%)
                    </el-button>
                  </el-col>
                </el-row>
                <table class="w-100 mgt-5">
                  <tr>
                    <th>Short-circuit impedance uk (%)</th>
                    <th>Base power (%)</th>
                    <th>Base voltage (%)</th>
                    <th>Load losses pk (%)</th>
                    <th>OLTC position (%)</th>
                    <th>DETC position (%)</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item, index) in asset.impedances.prim_sec" :key="index">
                    <td>
                      <el-input size="mini" v-model="item.short_circuit_impedances_uk">
                        <template slot="append">%</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.base_power">
                        <template slot="append">MVA</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.base_voltage">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.load_losses_pk">
                        <template slot="append">W</template>
                      </el-input>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <el-button size="mini" type="danger" class="w-100"
                        @click="asset.impedances.prim_sec.splice(index, 1)">
                          <i class="fas fa-trash"></i>
                          Delete
                      </el-button>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>

            <!-- prim-tert -->
            <el-row :gutter="20" class="content" v-if="asset.properties.asset_type==='Three-winding'">
              <el-col :span="16" class="col-content">
                <span style="font-weight: bolder"
                  >Short-circuit impedance Prim-Tert</span
                >
                <el-divider></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.impedances.prim_tert.push({
                      short_circuit_impedances_uk: '',
                      base_power: '',
                      base_voltage: '',
                      load_losses_pk: '',
                      oltc_position: '',
                      detc_position: ''
                    })">
                      <i class="fas fa-plus"></i> Add uk (%)
                      </el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.impedances.prim_tert=[]">
                      <i class="fas fa-xmark"></i>
                      Remove all uk (%)
                    </el-button>
                  </el-col>
                </el-row>
                <table class="w-100 mgt-5">
                  <tr>
                    <th>Short-circuit impedance uk (%)</th>
                    <th>Base power (%)</th>
                    <th>Base voltage (%)</th>
                    <th>Load losses pk (%)</th>
                    <th>OLTC position (%)</th>
                    <th>DETC position (%)</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item, index) in asset.impedances.prim_tert" :key="index">
                    <td>
                      <el-input size="mini" v-model="item.short_circuit_impedances_uk">
                        <template slot="append">%</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.base_power">
                        <template slot="append">MVA</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.base_voltage">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.load_losses_pk">
                        <template slot="append">W</template>
                      </el-input>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <el-button size="mini" type="danger" class="w-100"
                        @click="asset.impedances.prim_tert.splice(index, 1)">
                          <i class="fas fa-trash"></i>
                          Delete
                      </el-button>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>

            <!-- sec-tert -->
            <el-row :gutter="20" class="content" v-if="asset.properties.asset_type==='Three-winding'">
              <el-col :span="16" class="col-content">
                <span style="font-weight: bolder"
                  >Short-circuit impedance Sec-Tert</span
                >
                <el-divider></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.impedances.sec_tert.push({
                      short_circuit_impedances_uk: '',
                      base_power: '',
                      base_voltage: '',
                      load_losses_pk: '',
                      oltc_position: '',
                      detc_position: ''
                    })">
                      <i class="fas fa-plus"></i> Add uk (%)
                      </el-button>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="mini" type="info" class="w-100"
                    @click="asset.impedances.sec_tert=[]">
                      <i class="fas fa-xmark"></i>
                      Remove all uk (%)
                    </el-button>
                  </el-col>
                </el-row>
                <table class="w-100 mgt-5">
                  <tr>
                    <th>Short-circuit impedance uk (%)</th>
                    <th>Base power (%)</th>
                    <th>Base voltage (%)</th>
                    <th>Load losses pk (%)</th>
                    <th>OLTC position (%)</th>
                    <th>DETC position (%)</th>
                    <th></th>
                  </tr>
                  <tr v-for="(item, index) in asset.impedances.sec_tert" :key="index">
                    <td>
                      <el-input size="mini" v-model="item.short_circuit_impedances_uk">
                        <template slot="append">%</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.base_power">
                        <template slot="append">MVA</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.base_voltage">
                        <template slot="append">kV</template>
                      </el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.load_losses_pk">
                        <template slot="append">W</template>
                      </el-input>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <el-button size="mini" type="danger" class="w-100"
                        @click="asset.impedances.sec_tert.splice(index, 1)">
                          <i class="fas fa-trash"></i>
                          Delete
                      </el-button>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>

            <!-- zero sequence impedances -->
            <el-row :gutter="20" class="content">
              <el-col :span="8" class="col-content">
                <span style="font-weight: bolder">Zero sequence impedance</span>
                <el-divider></el-divider>
                <el-form
                  :inline-message="true"
                  label-width="140px"
                  size="mini"
                  label-position="left"
                >
                  <el-form-item label="Base power">
                    <el-input v-model="asset.impedances.zero_sequence_impedance.base_power">
                      <template slot="append">MVA</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="Base voltage">
                    <el-input v-model="asset.impedances.zero_sequence_impedance.base_voltage">
                      <template slot="append">kV</template>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>

        <!-- Others -->
        <div id="others" class="mgy-5">
          <el-row>
            <el-col :span="24">
              <div
                class="header-toggle pointer"
                @click="openOthers = !openOthers"
              >
                <i v-if="openOthers" class="fa-solid fa-caret-up"></i>
                <i v-else class="fa-solid fa-caret-down"></i>
                Others
              </div></el-col
            >
          </el-row>

          <div class="content-toggle" v-if="openOthers">
            <el-row :gutter="20" class="content">
              <el-col :span="8" class="col-content">
                <el-form
                  :model="asset.others"
                  label-width="140px"
                  size="mini"
                  label-position="left"
                >
                  <el-form-item label="Category">
                    <el-select
                      v-model="asset.others.category"
                      placeholder="Select category"
                    >
                      <el-option
                        label="Distribution"
                        value="Distribution"
                      ></el-option>
                      <el-option
                        label="Generation"
                        value="Generation"
                      ></el-option>
                      <el-option
                        label="HVDC transformer"
                        value="HVDC transformer"
                      ></el-option>
                      <el-option label="Power" value="Power"></el-option>
                      <el-option
                        label="Transmission"
                        value="Transmission"
                      ></el-option>
                      <el-option
                        label="Win gen. trans."
                        value="Win gen. trans."
                      ></el-option>
                      <el-option label="Other" value="Other"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Status">
                    <el-select
                      v-model="asset.others.status"
                      placeholder="Select status"
                    >
                      <el-option
                        label="In operation"
                        value="In operation"
                      ></el-option>
                      <el-option label="Spare" value="Spare"></el-option>
                      <el-option label="Repair" value="Repair"></el-option>
                      <el-option
                        label="Out of operation"
                        value="Out of operation"
                      ></el-option>
                      <el-option label="Scrap" value="Scrap"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Tank type">
                    <el-select
                      v-model="asset.others.tank_type"
                      placeholder="Select tank type"
                    >
                      <el-option
                        label="Free breathing"
                        value="Free breathing"
                      ></el-option>
                      <el-option
                        label="Nitrogen blanketed"
                        value="Nitrogen blanketed"
                      ></el-option>
                      <el-option label="Sealed" value="Sealed"></el-option>
                      <el-option
                        label="Sealed conservator"
                        value="Sealed conservator"
                      ></el-option>
                      <el-option label="Other" value="Other"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Insulation medium">
                    <el-select
                      v-model="asset.others.insulation_medium"
                      placeholder="Select insulation type"
                    >
                      <el-option label="Askarel" value="Askarel"></el-option>
                      <el-option label="Dry type" value="Dry type"></el-option>
                      <el-option label="Gas" value="Gas"></el-option>
                      <el-option
                        label="Natural ester"
                        value="Natural ester"
                      ></el-option>
                      <el-option
                        label="Mineral oil"
                        value="Mineral oil"
                      ></el-option>
                      <el-option label="Silicon" value="Silicon"></el-option>
                      <el-option label="Other" value="Other"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Insulation">
                    <el-radio-group v-model="asset.others.insulation.key" style="width: 100%">
                      <el-row :gutter="0" class="mgb-5">
                        <el-col :span="8">
                          <el-radio label="Weight" value="Weight"> Weight </el-radio>
                        </el-col>
                        <el-col :span="16">
                          <el-input v-model="asset.others.weight">
                            <template slot="append">kg</template>
                          </el-input>
                        </el-col>
                      </el-row>
                      <el-row :gutter="0">
                        <el-col :span="8">
                          <el-radio label="Volume" value="Volume"> Volume </el-radio>
                        </el-col>
                        <el-col :span="16">
                          <el-input v-model="asset.others.volume">
                            <template slot="append">l</template>
                          </el-input>
                        </el-col>
                      </el-row>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="Total weight">
                    <el-input v-model="asset.others.total_weight">
                      <template slot="append">kg</template>
                    </el-input>
                  </el-form-item>
                  <table style="width: 100%">
                    <tr>
                      <th style="width: 140px">Winding</th>
                      <th>Conductor material</th>
                    </tr>
                    <tr>
                      <td>Prim</td>
                      <td>
                        <el-select  v-model="asset.others.prim" size="mini">
                          <el-option
                            label="Aluminum"
                            value="Aluminum"
                          ></el-option>
                          <el-option label="Copper" value="Copper"></el-option>
                        </el-select>
                      </td>
                    </tr>
                    <tr>
                      <td>Sec</td>
                      <td>
                        <el-select  v-model="asset.others.sec" size="mini">
                          <el-option
                            label="Aluminum"
                            value="Aluminum"
                          ></el-option>
                          <el-option label="Copper" value="Copper"></el-option>
                        </el-select>
                      </td>
                    </tr>
                    <tr v-if="asset.properties.asset_type==='Three-winding'">
                      <td>Tert</td>
                      <td>
                        <el-select  v-model="asset.others.tert" size="mini">
                          <el-option
                            label="Aluminum"
                            value="Aluminum"
                          ></el-option>
                          <el-option label="Copper" value="Copper"></el-option>
                        </el-select>
                      </td>
                    </tr>
                  </table>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>

      <!-- Bushings -->
      <!-- <el-tab-pane label="Bushings">
        <div id="copy-bushing-data" class="mgy-5">
          <el-row :gutter="20" class="content">
            <el-col :span="16" class="col-content">
              <span style="font-weight: bolder">Copy bushing data</span>
              <el-divider></el-divider>
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="8" class="content">
                    <div class="grid-content bg-purple">
                      <span>From</span>
                    </div>
                  </el-col>
                  <el-col :span="8" class="content">
                    <div class="grid-content bg-purple-light">
                      <span>To</span>
                    </div>
                  </el-col>
                  <el-col :span="8" class="content">
                    <div class="grid-content bg-purple">
                      <span></span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8" class="content">
                    <div class="grid-content bg-purple">
                      <el-select placeholder="A" size="small">
                        <el-option label="A" value="A"> </el-option>
                        <el-option label="B" value="B"> </el-option>
                        <el-option label="C" value="C"> </el-option>
                        <el-option label="N" value="N"> </el-option>
                        <el-option label="a1" value="a1"> </el-option>
                        <el-option label="b1" value="b1"> </el-option>
                        <el-option label="c1" value="c1"> </el-option>
                        <el-option label="n1" value="n1"> </el-option>
                        <el-option label="a2" value="a2"> </el-option>
                        <el-option label="b2" value="b2"> </el-option>
                        <el-option label="c2" value="c2"> </el-option>
                        <el-option label="n2" value="n2"> </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="8" class="content">
                    <div class="grid-content bg-purple-light">
                      <el-select placeholder="A" size="small">
                        <el-option label="A" value="A"> </el-option>
                        <el-option label="B" value="B"> </el-option>
                        <el-option label="C" value="C"> </el-option>
                        <el-option label="N" value="N"> </el-option>
                        <el-option label="a1" value="a1"> </el-option>
                        <el-option label="b1" value="b1"> </el-option>
                        <el-option label="c1" value="c1"> </el-option>
                        <el-option label="n1" value="n1"> </el-option>
                        <el-option label="a2" value="a2"> </el-option>
                        <el-option label="b2" value="b2"> </el-option>
                        <el-option label="c2" value="c2"> </el-option>
                        <el-option label="n2" value="n2"> </el-option>
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span="8" class="content">
                    <div class="grid-content bg-purple">
                      <el-input
                        placeholder="Copy"
                        v-model="input"
                        size="small"
                      ></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>

        <div id="primary-bushings">
          <el-row :gutter="20" class="content">
            <el-col :span="24" class="col-content">
              <div class="grid-content bg-purple-dark">
                <span style="font-weight: bolder">Primary bushings</span>
                <el-divider></el-divider>
                <el-auto-resizer> </el-auto-resizer>
                <div class="scrollit">
                  <table class="w-100 mgt-5">
                    <tr>
                      <th>Pos.</th>
                      <th>Asset type</th>
                      <th>Serial no.</th>
                      <th>Manufacturer</th>
                      <th>Manufacturer type</th>
                      <th>Manufacturer year</th>
                      <th>Insul. level LL (BIL)</th>
                      <th>Voltage L-ground</th>
                      <th>Max. system voltage</th>
                      <th>Rate current</th>
                      <th>DF (C1)</th>
                      <th>Cap. (C1)</th>
                      <th>DF (C2)</th>
                      <th>Cap. (C2)</th>
                      <th>Insulation type</th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>A</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input></el-input>
                      </td>
                      <td>
                        <el-input></el-input>
                      </td>
                      <td>
                        <el-input></el-input>
                      </td>
                      <td>
                        <el-input></el-input>
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input>
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>N</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div id="secondary-bushings">
          <el-row :gutter="20" class="content">
            <el-col :span="24" class="col-content">
              <div class="grid-content bg-purple-dark">
                <span style="font-weight: bolder">Secondary bushings</span>
                <el-divider></el-divider>
                <el-auto-resizer> </el-auto-resizer>
                <div class="scrollit">
                  <table class="w-100 mgt-5">
                    <tr>
                      <th>Pos.</th>
                      <th>Asset type</th>
                      <th>Serial no.</th>
                      <th>Manufacturer</th>
                      <th>Manufacturer type</th>
                      <th>Manufacturer year</th>
                      <th>Insul. level LL (BIL)</th>
                      <th>Voltage L-ground</th>
                      <th>Max. system voltage</th>
                      <th>Rate current</th>
                      <th>DF (C1)</th>
                      <th>Cap. (C1)</th>
                      <th>DF (C2)</th>
                      <th>Cap. (C2)</th>
                      <th>Insulation type</th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>A</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>N</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div id="tertiary-bushings">
          <el-row :gutter="20" class="content">
            <el-col :span="24" class="col-content">
              <div class="grid-content bg-purple-dark">
                <span style="font-weight: bolder">Secondary bushings</span>
                <el-divider></el-divider>
                <el-auto-resizer> </el-auto-resizer>
                <div class="scrollit">
                  <table class="w-100 mgt-5">
                    <tr>
                      <th>Pos.</th>
                      <th>Asset type</th>
                      <th>Serial no.</th>
                      <th>Manufacturer</th>
                      <th>Manufacturer type</th>
                      <th>Manufacturer year</th>
                      <th>Insul. level LL (BIL)</th>
                      <th>Voltage L-ground</th>
                      <th>Max. system voltage</th>
                      <th>Rate current</th>
                      <th>DF (C1)</th>
                      <th>Cap. (C1)</th>
                      <th>DF (C2)</th>
                      <th>Cap. (C2)</th>
                      <th>Insulation type</th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>A</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>N</td>
                      <td>
                        <el-select
                          placeholder="<Select asset type>"
                          size="small"
                        >
                          <el-option
                            label="With potential tab"
                            value="With potential tab"
                          >
                          </el-option>
                          <el-option
                            label="With test tab"
                            value="With test tab"
                          >
                          </el-option>
                          <el-option label="Without tab" value="Without tab">
                          </el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input ></el-input>
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">kV</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">A</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">%</template></el-input
                        >
                      </td>
                      <td>
                        <el-input >
                          <template slot="append">pF</template></el-input
                        >
                      </td>
                      <td>
                        <el-select
                          placeholder="<Select insulation type>"
                          size="small"
                        >
                          <el-option
                            label="Oil-impregnated paper"
                            value="Oil-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-bonoed paper"
                            value="Resin-bonoed paper"
                          >
                          </el-option>
                          <el-option
                            label="Resin-impregnated paper"
                            value="Resin-impregnated paper"
                          >
                          </el-option>
                          <el-option
                            label="Porcelain dry type"
                            value="Porcelain dry type"
                          >
                          </el-option>
                          <el-option
                            label="Composite dry type"
                            value="Composite dry type"
                          >
                          </el-option>
                          <el-option label="Other" value="Other"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input
                          
                          placeholder="Show details"
                        ></el-input>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane> -->

      <!-- Tab changers -->
      <!-- <el-tab-pane label="Tab changers">
        <div id="content-tabchangers" class="mgy-5">
          <el-row :gutter="20" class="content">
            <el-col :span="24" class="col-content"
              ><div class="grid-content ep-bg-purple" />
              <el-row>
                <el-col :span="12"
                  ><div class="grid-content ep-bg-purple">
                    <el-row
                      ><el-checkbox v-model="checked">OLTC</el-checkbox></el-row
                    >
                    <el-row>
                      <el-col :span="18"
                        ><div class="grid-content bg-purple">
                          <el-row :gutter="20" class="content">
                            <el-col :span="24" class="col-content">
                              <el-form
                                :model="asset.properties"
                                :inline-message="true"
                                label-width="140px"
                                size="mini"
                                label-position="left"
                              >
                                <el-form-item label="Serial no.">
                                  <el-input
                                    v-model="asset.properties.serial_no"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item label="Manufactory">
                                  <el-input
                                    v-model="asset.properties.manufacture"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item label="Manufactory type">
                                  <el-input
                                    v-model="asset.properties.manufacture_type"
                                  ></el-input>
                                </el-form-item>
                              </el-form>
                            </el-col>
                          </el-row>

                          <div id="tap-changers-configuration">
                            <el-row :gutter="20" class="content">
                              <el-col :span="24" class="col-content"
                                ><div class="grid-content ep-bg-purple" />
                                <span style="font-weight: bolder"
                                  >Tap changers configuration</span
                                >
                                <el-divider></el-divider>
                                <el-form
                                  :model="asset.properties"
                                  :inline-message="true"
                                  label-width="140px"
                                  size="mini"
                                  label-position="left"
                                >
                                  <el-form-item label="Widing">
                                    <el-select
                                      placeholder="Prim"
                                      size="small"
                                    >
                                      <el-option
                                        label="Prim"
                                        value="Prim"
                                      >
                                      </el-option>
                                      <el-option
                                        label="Sec"
                                        value="Sec"
                                      >
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item label="Tab scheme">
                                    <el-select
                                      placeholder="1...33"
                                      size="small"
                                    >
                                      <el-option
                                        label="1...33"
                                        value="1...33"
                                      >
                                      </el-option>
                                      <el-option
                                        label="33...1"
                                        value="33...1"
                                      >
                                      </el-option>
                                      <el-option
                                        label="16R...N...16L"
                                        value="16R...N...16L"
                                      >
                                      </el-option>
                                      <el-option
                                        label="16L...N...16R"
                                        value="16L...N...16R"
                                      >
                                      </el-option>
                                      <el-option
                                        label="-16...N...16"
                                        value="-16...N...16"
                                      >
                                      </el-option>
                                      <el-option
                                        label="-16...N...16"
                                        value="-16...N...16"
                                      >
                                      </el-option>
                                      <el-option
                                        label="16...N...-16"
                                        value="16...N...-16"
                                      >
                                      </el-option>
                                      <el-option
                                        label="Free"
                                        value="Free"
                                      >
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item label="No. of taps">
                                    <el-input
                                      v-model="asset.properties.manufacture_type">
                                    </el-input>
                                  </el-form-item>
                                </el-form>
                              </el-col>
                            </el-row>
                          </div>
                          <div id="voltage-table">
                            <el-row :gutter="20" class="content">
                              <el-col :span="24" class="col-content"
                                ><div class="grid-content ep-bg-purple" />
                                <span style="font-weight: bolder">Voltage table</span>
                                <el-divider></el-divider>
                                <el-row>
                                  <el-button size="mini">Add</el-button>
                                  <el-button size="mini">Delete</el-button>
                                  <el-button size="mini">Calculate</el-button>
                                  <el-button size="mini">Remove all</el-button>
                                </el-row>

                                <el-row :gutter="20">
                                  <table class="w-100 mgt-5">
                                    <thead>
                                      <tr>
                                        <th scope="col">Tap</th>
                                        <th scope="col">Voltage</th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                </el-row>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="12"
                  ><div class="grid-content ep-bg-purple-light" />
                  <el-row
                      ><el-checkbox v-model="checked">DETC</el-checkbox></el-row>
                    <el-row>
                      <el-col :span="18"><div class="grid-content bg-purple">
                          <el-row :gutter="20" class="content">
                            <el-col :span="24" class="col-content">
                              <el-form
                                :model="asset.properties"
                                :inline-message="true"
                                label-width="140px"
                                size="mini"
                                label-position="left"
                              >
                                <el-form-item label="Serial no.">
                                  <el-input
                                    v-model="asset.properties.serial_no"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item label="Manufactory">
                                  <el-input
                                    v-model="asset.properties.manufacture"
                                  ></el-input>
                                </el-form-item>
                                <el-form-item label="Manufactory type">
                                  <el-input
                                    v-model="asset.properties.manufacture_type"
                                  ></el-input>
                                </el-form-item>
                              </el-form>
                            </el-col>
                          </el-row>

                          <div id="tap-changers-configuration">
                            <el-row :gutter="20" class="content">
                              <el-col :span="24" class="col-content"
                                ><div class="grid-content ep-bg-purple" />
                                <span style="font-weight: bolder"
                                  >Tap changers configuration</span
                                >
                                <el-divider></el-divider>
                                <el-form
                                  :model="asset.properties"
                                  :inline-message="true"
                                  label-width="140px"
                                  size="mini"
                                  label-position="left"
                                >
                                  <el-form-item label="Widing">
                                    <el-select
                                      placeholder="Prim"
                                      size="small"
                                    >
                                      <el-option
                                        label="Prim"
                                        value="Prim"
                                      >
                                      </el-option>
                                      <el-option
                                        label="Sec"
                                        value="Sec"
                                      >
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item label="Tab scheme">
                                    <el-select
                                      placeholder="1...N"
                                      size="small"
                                    >
                                      <el-option
                                        label="1...N"
                                        value="1...N"
                                      >
                                      </el-option>
                                      <el-option
                                        label="N...1"
                                        value="N...1"
                                      >
                                      </el-option>
                                      <el-option
                                        label="A...Z"
                                        value="A...Z"
                                      >
                                      </el-option>
                                      <el-option
                                        label="Z...A"
                                        value="Z...A"
                                      >
                                      </el-option>
                                      <el-option
                                        label="Free"
                                        value="Free"
                                      >
                                      </el-option>
                                    </el-select>
                                  </el-form-item>
                                  <el-form-item label="No. of taps">
                                    <el-input
                                      v-model="asset.properties.manufacture_type">
                                    </el-input>
                                  </el-form-item>
                                  <el-form-item label="Currrent tap position">
                                    <el-select
                                      placeholder="1"
                                      size="mini"
                                    >
                                      <el-option
                                        label="Prim"
                                        value="Prim"
                                      >
                                      </el-option>
                                      
                                    </el-select>
                                  </el-form-item>
                                </el-form>
                              </el-col>
                            </el-row>
                          </div>
                          <div id="voltage-table">
                            <el-row :gutter="20" class="content">
                              <el-col :span="24" class="col-content"
                                ><div class="grid-content ep-bg-purple" />
                                <span style="font-weight: bolder">Voltage table</span>
                                <el-divider></el-divider>
                                <el-row>
                                  <el-button size="mini">Add</el-button>
                                  <el-button size="mini">Delete</el-button>
                                  <el-button size="mini">Calculate</el-button>
                                  <el-button size="mini">Remove all</el-button>
                                </el-row>

                                <el-row :gutter="20">
                                  <table class="w-100 mgt-5">
                                    <thead>
                                      <tr>
                                        <th scope="col">Tap</th>
                                        <th scope="col">Voltage</th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                                </el-row>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </el-col>
                    </el-row>

                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane> -->
    </el-tabs>
    
    <winding-configuration :open-dialog="openDialog" @close-dialog="onCloseDialog"></winding-configuration>
  </div>
</template>

<script>
import { mapState } from "vuex";
import WindingConfiguration from "@/components/WindingConfiguration";

export default {
  name: "AssetView",
  components: {
    WindingConfiguration,
  },
  data() {
    return {
      mode: "add",
      radio: 3,
      asset_id: null,
      saved: false,
      asset: {
        id: "",
        properties: {
          asset: "Transformer",
          asset_type: "Two-winding",
          serial_no: "",
          manufacture: "",
          manufacture_type: "",
          manufacture_year: "",
          asset_system_code: "",
          apparatus_id: "",
          feeder: "",
        },
        comment: "",
        winding_configuration: {
          phases: "3",
          vector_group: {
            prim: "",
            sec: "",
            tert: "",
          },
          unsupported_vector_group: ""
        },
        ratings: {
          rated_frequency: "50",
          rated_frequency_custom: "50",
          voltage_ratings: {
            prim: {
              voltage_ll: "",
              voltage_ln: "",
              insul_level_ll: "",
              comment: "",
            },
            sec: {
              voltage_ll: "",
              voltage_ln: "",
              insul_level_ll: "",
              comment: "",
            },
            tert: {
              voltage_ll: "",
              voltage_ln: "",
              insul_level_ll: "",
              comment: "",
            },
          },
          power_ratings: [],
          current_ratings: {
            prim: "",
            sec: "",
            tert: "",
          },
          short_circuit: {
            ka: "",
            s: ""
          }
        },
        impedances: {
          ref_temp: 75,
          prim_sec: [],
          prim_tert: [],
          sec_tert: [],
          zero_sequence_impedance: {
            base_power: "",
            base_voltage: ""
          }
        },
        others: {
          category: "",
          status: "",
          tank_type: "",
          insulation_medium: "",
          insulation: {
            key: "Weight",
            weight: "",
            volume: "",
          },
          total_weight: "",
          prim: "Copper",
          sec: "Copper",
          tert: "Copper"
        },
      },
      location_id: null,
      openWindingConfiguration: true,
      openRatings: true,
      openImpedances: true,
      openOthers: true,
      openDialog: false
    };
  },
  computed: mapState([
    // map this.count to store.state.count
    "user",
  ]),
  async beforeMount() {
    this.location_id = this.$route.query.location_id;
    this.mode = this.$route.query.mode;
    // if (this.mode === 'edit'){
    //   this.location_id = this.$route.query.location_id
    //   const rs = await window.electronAPI.getLocationById(this.location_id)
    //   if (rs.success){
    //     const data = rs.data
    //     this.location = {
    //       id: data.id,
    //       properties: {
    //         name: data.name,
    //         region: data.region,
    //         division: data.division,
    //         area: data.area,
    //         plant: data.plant,
    //         address: data.address,
    //         city: data.city,
    //         state_province: data.state_province,
    //         postal_code: data.postal_code,
    //         country: data.country,
    //         geo_coordinates: data.geo_coordinates,
    //         location_system_code: data.location_system_code
    //       },
    //       contact_person: {
    //         name: data.person_name,
    //         phone_no1: data.person_phone_no1,
    //         phone_no2: data.person_phone_no2,
    //         fax_no: data.person_fax_no,
    //         email: data.person_email
    //       },
    //       comment: data.comment,
    //       company: {
    //         company: data.company_company,
    //         department: data.company_department,
    //         address: data.company_address,
    //         city: data.company_city,
    //         state_province: data.company_state_province,
    //         postal_code: data.company_postal_code,
    //         country: data.company_country,
    //         phone_no: data.company_phone_no,
    //         fax_no: data.company_fax_no,
    //         email:data.company_email
    //       }
    //     }
    //   }
    // }
  },
  mounted() {},
  methods: {
    saveAsset() {
      console.log(this.asset)
      // const sel = this;
      // this.$refs[formName].validate(async (valid) => {
      //   if (valid) {
      //     if (sel.mode === "add") {
      //       await sel.insertLocation();
      //       sel.$message({
      //         type: "success",
      //         message: "Insert completed",
      //       });
      //       this.$router.push({ name: "manage" });
      //     } else {
      //       await sel.updateLocation();
      //       sel.$message({
      //         type: "success",
      //         message: "Update completed",
      //       });
      //     }
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    deleteLocation() {
      const sel = this;
      this.$confirm("Do you want to delete this location?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          await window.electronAPI.deleteLocation(sel.location_id);
          sel.$message({
            type: "success",
            message: "Delete completed",
          });
          sel.$router.push({ name: "manage" });
        })
        .catch(() => {
          return;
        });
    },
    async insertLocation() {
      const rs = await window.electronAPI.insertLocation(
        this.user.id,
        this.location
      );
      console.log("insert", rs);
    },
    async updateLocation() {
      const rs = await window.electronAPI.updateLocation(this.location);
      console.log("update", rs);
    },
    backToManage() {
      const sel = this;
      this.$confirm("Do you want to exit?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          sel.$router.push({ name: "manage" });
        })
        .catch(() => {
          return;
        });
    },
    onCloseDialog(){
      this.openDialog= false
    }
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  height: 100px;
  padding: 5px;
  background-color: #ebedef;
  box-sizing: border-box;
  border-bottom: 1px solid #aeb6bf;

  .el-button {
    width: 120px;
    height: 90px;
    border: none;
    background: inherit;
    border-radius: 0;
  }
}

.scrollit {
  overflow: auto;
  height: 100%;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.content {
  // height: calc(100vh - 100px);
  margin: 0 !important;
  padding: 10px;

  .col-content {
    height: 100%;
  }
}

.header-toggle {
  background: #99a9bf;
  padding: 5px 15px;
}

span.text-header {
  margin-bottom: 10px;
}

table,
td,
th {
  border: 1px solid;
  box-sizing: border-box;
  text-align: left;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 10px;
}
</style>
