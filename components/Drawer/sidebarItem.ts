export default [
    { header: "Dashboard" },
    // {
    //   title: "ລູກຄ້າທົ່ວໄປ",
    //   icon: "account",
    //   to: "/dashboards/analytical",
    // },
    // {
    //   title: "ລູກຄ້າບໍລິສັດ",
    //   icon: "account",
    //   to: "/dashboards/analytical",
    // },
    // {
    //   title: "ລູກຄ້າບໍລິສັດ ທີ່ເປັນກຸ່ມ",
    //   icon: "account",
    //   to: "/dashboards/analytical",
    // },
    {
      group: "/ui-components/",
      model: false,
      icon: "filter-variant",
      title: "ຂໍ້ມູນລູກຄ້າ",
      children: [
        {
          title: "ກຸ່ມບໍລິສັດ",
          icon: "select-group",
          to: "/Groups",
        },
        {
          title: "ບໍລິສັດ",
          icon: "domain",
          to: "/Companies",
        },
        {
          title: "User ເຂົ້າໃຊ້ງານ",
          icon: "account-plus-outline",
          to: "/Users",
        },
        
      ],
    },
  
  
  ];
  