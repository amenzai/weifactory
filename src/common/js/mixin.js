export const controlModelMixin = {
  data() {
    return {
      cultModel: []
    }
  },
  created() {
    this.cultModel = this.$store.state.dicInfo.controlModel
  }
}

export const depositMixin = {
  data() {
    return {
      hostType: []
    }
  },
  created() {
    this.hostType = this.$store.state.dicInfo.deposit
  }
}

export const deviceStatusMixin = {
  data() {
    return {
      deviceStatus: []
    }
  },
  created() {
    this.deviceStatus = this.$store.state.dicInfo['device-status']
  }
}

export const deviceTypeMixin = {
  data() {
    return {
      typeDic: []
    }
  },
  created() {
    this.typeDic = this.$store.state.dicInfo['device.type']
  }
}

export const exceptionTypeMixin = {
  data() {
    return {
      exceptionType: []
    }
  },
  created() {
    this.exceptionType = this.$store.state.dicInfo.exceptionType
  }
}

export const optionTypeMixin = {
  data() {
    return {
      optionType: []
    }
  },
  created() {
    this.optionType = this.$store.state.dicInfo.optionType
  }
}

export const orderStatusMixin = {
  data() {
    return {
      orderStatus: []
    }
  },
  created() {
    this.orderStatus = this.$store.state.dicInfo['order-status']
  }
}

export const payChannelMixin = {
  data() {
    return {
      payChannel: []
    }
  },
  created() {
    this.payChannel = this.$store.state.dicInfo.payChannel
  }
}

export const priceMixin = {
  data() {
    return {
      price: []
    }
  },
  created() {
    this.price = this.$store.state.dicInfo.price
  }
}

export const roleNoMixin = {
  data() {
    return {
      roleNo: []
    }
  },
  created() {
    this.roleNo = this.$store.state.dicInfo.roleNo
  }
}

export const scheduleOptionMixin = {
  data() {
    return {
      scheduleOption: []
    }
  },
  created() {
    this.scheduleOption = this.$store.state.dicInfo.scheduleOption
  }
}

export const scheduleStatusMixin = {
  data() {
    return {
      scheduleStatus: []
    }
  },
  created() {
    this.scheduleStatus = this.$store.state.dicInfo.scheduleStatus
  }
}

export const statusMixin = {
  data() {
    return {
      paramStatus: []
    }
  },
  created() {
    this.paramStatus = this.$store.state.dicInfo.status
  }
}

export const trustStatusMixin = {
  data() {
    return {
      trustStatusArr: []
    }
  },
  created() {
    this.trustStatusArr = this.$store.state.dicInfo.trustStatus
  }
}

export const userRoleMixin = {
  data() {
    return {
      roleArr: []
    }
  },
  created() {
    this.roleArr = this.$store.state.dicInfo.userRole
  }
}

export const vegetableNameMixin = {
  data() {
    return {
      vegetableName: []
    }
  },
  created() {
    this.vegetableName = this.$store.state.dicInfo['vegetable.name']
  }
}

export const authStatusMixin = {
  data() {
    return {
      authStatus: []
    }
  },
  created() {
    this.authStatus = this.$store.state.dicInfo.authStatus
  }
}

export const expertArrMixin = {
  data() {
    return {
      expertArr: []
    }
  },
  created() {
    this.getOnlineExpert()
  },
  methods: {
    getOnlineExpert() {
      this.$http.post('user/onlineExpert').then(res => {
        this.expertArr = res.data.map(item => {
          return {
            itemName: item.userName,
            itemCode: item.userId
          }
        })
      })
    }
  }
}
