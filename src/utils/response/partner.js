const defaultResponse = {
    getCustomerPromiseTime: {
      200: {
        httpCode: '200',
        response: {
          statusCode: 1006,
          statusMessage: 'CPT Fetched Successfully',
          statusType: 'SUCCESS',
        },
        additionalField: [{ field: 'response.serviceabilityInfos', value: 'serviceabilityInfos' }],
      },
      400: {
        httpCode: '400',
        response: {
          statusCode: 400,
          statusMessage: 'Invalid data provided',
          statusType: 'ERROR'
        },
        additionalField: [{ field: 'status.message', value: 'message' }],
      },
      500: {
        httpCode: '500',
        response: {
          statusCode: 500,
          statusMessage: 'Error while processing request',
          statusType: 'ERROR'
        }
      }
    },
    updateDiscount: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1006,
          statusMessage: 'Discounts processed successfully',
          statusType: 'SUCCESS'
        }
      },
      1006: {
        httpCode: '200',
        response: {
          statusCode: 1006,
          statusMessage: 'Discount partially updated',
          statusType: 'SUCCESS'
        },
        additionalField: 'discountEntries'
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2003,
          statusMessage: 'Error while processing discount',
          statusType: 'ERROR'
        }
      }
    },
  
    updateInventory: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1001,
          statusMessage: 'Inventory updated successfully',
          statusType: 'SUCCESS'
        }
      },
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1001,
          statusMessage: 'Order partially updated',
          statusType: 'SUCCESS'
        },
        additionalField: 'inventoryEntries'
      },
      400: {
        httpCode: '400',
        response: {
          statusCode: 400,
          statusMessage: 'Invalid data provided',
          statusType: 'ERROR'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2001,
          statusMessage: 'Error while updating inventory',
          statusType: 'ERROR'
        }
      }
    },
  
    searchInventory: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1002,
          statusMessage: 'Inventory retrieved successfully',
          statusType: 'SUCCESS'
        },
        additionalField: 'inventoryDetails'
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2002,
          statusMessage: 'Error while retrieving inventory',
          statusType: 'ERROR'
        }
      }
    },
  
    orderUpdate: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1008,
          statusMessage: 'Order updated successfully',
          statusType: 'SUCCESS'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 3002,
          statusMessage: 'Error while updating Order',
          statusType: 'ERROR'
        }
      }
    }, // success: in case of reject order details also has to be provided.
  
    readyToDispatch: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1003,
          statusMessage: 'Order updated successfully',
          statusType: 'SUCCESS'
        }
      },
      2005: {
        httpCode: '400',
        response: {
          statusCode: 2005,
          statusMessage: 'Duplicate Request',
          statusType: 'ERROR'
        }
      },
      2006: {
        httpCode: '400',
        response: {
          statusCode: 2006,
          statusMessage: 'Invalid payload data',
          statusType: 'ERROR'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2004,
          statusMessage: 'Business Validation failure',
          statusType: 'ERROR'
        }
      }
    }, //success: Mnytra generated invoice and Seller generated invoice structure is same
    // 500 is added additionally as a default response
  
    getInvoiceDetails: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1003,
          statusMessage: 'Tax info fetched successfully',
          statusType: 'SUCCESS'
        },
        additionalField: 'orderLineEntries'
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2050,
          statusMessage: 'Order is not marked RTD yet',
          statusType: 'ERROR'
        }
      }
    },
  
    cancelItems: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1004,
          statusMessage: 'Items cancelled successfully',
          statusType: 'SUCCESS'
        }
      },
      2006: {
        httpCode: '400',
        response: {
          statusCode: 2006,
          statusMessage: 'Invalid payload data',
          statusType: 'ERROR'
        }
      },
      2005: {
        httpCode: '400',
        response: {
          statusCode: 2005,
          statusMessage: 'Duplicate Request',
          statusType: 'ERROR'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2004,
          statusMessage: 'Business Validation failure',
          statusType: 'ERROR'
        }
      }
    }, //error: business validation failure, and duplicate request
  
    reassignWarehouse: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1003,
          statusMessage: 'Order updated successfully',
          statusType: 'SUCCESS'
        }
      },
      1007: {
        httpCode: '500',
        response: {
          statusCode: 1007,
          statusMessage: 'Partial order updated successfully',
          statusType: 'SUCCESS'
        }
      },
      1008: {
        httpCode: '500',
        response: {
          statusCode: 1008,
          statusMessage: 'All reassign failed in the request',
          statusType: 'ERROR'
        }
      },
      2005: {
        httpCode: '500',
        response: {
          statusCode: 2005,
          statusMessage: 'Inventory is unavailable in warehouse',
          statusType: 'ERROR'
        }
      },
      2006: {
        httpCode: '500',
        response: {
          statusCode: 2006,
          statusMessage: 'Order is not serviceable from this warehouse',
          statusType: 'ERROR'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2004,
          statusMessage: 'Business Validation failure',
          statusType: 'ERROR'
        }
      }
    },
  
    downloadInvoice: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 200,
          statusMessage: 'PDF would be sent',
          statusType: 'SUCCESS'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2050,
          statusMessage: 'Order is not marked RTD yet.',
          statusType: 'ERROR'
        }
      }
    }, // 200 would never be called .. instead file would be sent
  
    getOrderById: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1005,
          statusMessage: 'Order retrieved successfully',
          statusType: 'SUCCESS'
        },
        additionalField: 'orderEntry'
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2020,
          statusMessage: 'Error while retrieving order',
          statusType: 'ERROR'
        }
      }
    },
  
    getOrderByPacketId: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1005,
          statusMessage: 'Packet retrieved successfully',
          statusType: 'SUCCESS'
        },
        additionalField: 'orderEntry'
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 2020,
          statusMessage: 'Error while retrieving order.',
          statusType: 'ERROR'
        }
      }
    },
  
    downloadShippingLabel: {
      1001: {
        httpCode: '200',
        response: {
          statusCode: 1,
          statusMessage: 'pdf would be downloaded',
          statusType: 'SUCCESS'
        }
      },
      2003: {
        httpCode: '500',
        response: {
          statusCode: 500,
          statusMessage: 'Error while processing request.',
          statusType: 'ERROR'
        }
      }
    },
  
    pushApprovedPO: {
      1006: {
        httpCode: 200,
        response: {
          statusCode: 1006,
          statusMessage: 'PO Aproved Pushed successfully',
          statusType: 'SUCCESS',
          status: {
            statusCode: 1006,
            statusMessage: 'PO Aproved Pushed successfully',
            statusType: 'SUCCESS',
          },
        },
      },
      3001: {
        httpCode: 500,
        response: {
          statusCode: 3001,
          statusMessage: 'Error while Pushing Purchase Order',
          statusType: 'ERROR',
          status: {
            statusCode: 3001,
            statusMessage: 'Error while Pushing Purchase Order',
            statusType: 'ERROR',
          },
        },
      },
    },
    createBackOrder: {
      1006: {
        httpCode: '200',
        response: {
            statusCode: 1006,
            statusMessage: 'Order Created Successfully',
            statusType: 'SUCCESS',
            message: 'Order Created Successfully',
            status: 'success'
        }
      },
      3001: {
        httpCode: '400',
        response: {
          statusCode: 3001,
          statusMessage: "Error while creating an order",
          statusType: "ERROR",
          message: "Error while creating an order",
          status: "success"
  
        },
      },
    },
    updateBackOrder: {
      1008: {
        httpCode: '200',
        response: {
          statusCode: 1008,
          statusMessage: "Order updated successfully",
          statusType: "SUCCESS",
          message: "Order updated successfully",
          status: "success"
        }
      },
      3002: {
        httpCode: '400',
        response: {
          statusCode: 3002,
          statusMessage: "Error while updating an order",
          statusType: "ERROR",
          message: "Error while updating an order",
          status: "error"
  
        },
      },
    },
    getByPacketId: {
      400: {
        httpCode: '400',
        response: {
          status:{
            statusCode: 400,
            statusMessage: 'Invalid Data Provided',
            statusType: 'ERROR'
          }
        }
      },
      5016: {
        httpCode: '500',
        response: {
          status:{
            statusCode: 5016,
            statusMessage: 'Partner warehouse config missing',
            statusType: 'ERROR'
          }
        },
        additionalField: [{ field: 'response.status.statusMessage', value: 'statusMessage' }],
      },
      5017: {
        httpCode: '200',
        response: {
          status:{
            statusCode: 5017,
            statusMessage: 'Invalid integration ERP for given Seller',
            statusType: 'SUCCESS'
          },
          data: []
        },
        additionalField: [{ field: 'response.status.statusMessage', value: 'statusMessage' }],
      },
      6192: {
        httpCode: '400',
        response: {
          status:{
            statusCode: 6192,
            statusMessage: "Invalid Request: Request is null or Empty",
            statusType: "ERROR",
          }
        },
      },
      6176: {
        httpCode: '400',
        response: {
          status:{
            statusCode: 6176,
            statusMessage: "Order release not found",
            statusType: "ERROR",
          }
        },
        additionalField: [{ field: 'response.status.statusMessage', value: 'statusMessage' }],
      },
      6166: {
        httpCode: '500',
        response: {
          status:{
            statusCode: 6166,
            statusMessage: "Error in WMS Platform",
            statusType: "ERROR",
          }
        },
        additionalField: [{ field: 'response.status.statusMessage', value: 'statusMessage' }],
      },
      3: {
        httpCode: '200',
        response: {
          status:{
            statusCode: 3,
            statusMessage: "Success",
            statusType: "SUCCESS",
          }
        },
        additionalField: [
          { field: 'response.data', value: 'data' }],
      },
      500: {
        httpCode: '500',
        response: {
          status:{
            statusCode: 500,
            statusMessage: 'Error while processing request',
            statusType: 'ERROR'
          }
        }
      },
      0: {
        httpCode: '500',
        response: {
          status:{
            statusCode: 0,
            statusMessage: 'ERROR FETCHING Order Ids',
            statusType: 'ERROR',
            totalCount: 0
          }
        }
      },
    },
    user : {
      400: {
        httpCode: '400',
        response: {
          statusCode: 400,
          statusMessage: 'Invalid Data Provided',
          statusType: 'ERROR'
        }
      },
      100: {
        httpCode: '200',
        response: {
          statusCode: 100,
          statusMessage: "Config retrieved",
          statusType: "SUCCESS",
        },
        additionalField: [{ field: 'response.data', value: 'data' }],    
      },
      500: {
        httpCode: '500',
        response: {
          statusCode: 500,
          statusMessage: 'Error while processing request',
          statusType: 'ERROR'
        }
      }
    },
    updateExchangeItems : {
      400: {
        httpCode: '400',
        response: {
          statusCode: 400,
          statusMessage: 'Invalid Data Provided',
          statusType: 'ERROR'
        }
      },
      53: {
        httpCode: '500',
        response: {
          statusCode: 53,
          statusMessage: "Row with given id not found",
          statusType: "ERROR",
        },
        additionalField: [{ field: 'response.data', value: 'data' },{ field: 'response.status.statusMessage', value: 'statusMessage' }],    
      },
      8419:{
        httpCode: '500',
        response: {
          statusCode: 8419,
          statusMessage: "Error occoured while updating cc ticket",
          statusType: "ERROR",
        },
        additionalField: [{ field: 'response.data', value: 'data' },{ field: 'response.status.statusMessage', value: 'statusMessage' }],    
      },
      1058:{
        httpCode: '200',
        response: {
          statusCode: 1058,
          statusMessage: "Successfully updated ticket info",
          statusType: "SUCCESS",
        },
        additionalField: [{ field: 'response.data', value: 'data' },{ field: 'response.status.statusMessage', value: 'statusMessage' }],    
      },
      3:{
        httpCode: '200',
        response: {
          statusCode: 3,
          statusMessage: "Successfully updated ticket info",
          statusType: "SUCCESS",
        },
        additionalField: [{ field: 'response.entries', value: 'entries' },{ field: 'response.status.statusMessage', value: 'statusMessage' }],    
      },
      899:{
        httpCode: '400',
        response: {
          statusCode: 899,
          statusMessage: "Invalid tracking number",
          statusType: "ERROR",
        },
        additionalField: [{ field: 'response.entries', value: 'entries' },{ field: 'response.status.statusMessage', value: 'statusMessage' }],    
      },
      500: {
        httpCode: '500',
        response: {
          statusCode: 500,
          statusMessage: 'Error while processing request',
          statusType: 'ERROR'
        }
      }
    }
  };
  export { defaultResponse };
  