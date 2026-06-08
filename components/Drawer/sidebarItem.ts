export default [
  
    {
      group: "/ui-components/",
      model: false,
      icon: "carbon:customer-service",
      title: "ຂໍ້ມູນລູກຄ້າ",
      children: [
        {
          title: "ກຸ່ມບໍລິສັດ",
          icon: "formkit:group",
          to: "/groups",
        },
        {
          title: "ບໍລິສັດ",
          icon: "carbon:location-company",
          to: "/companies",
        },
        {
          title: "User ເຂົ້າໃຊ້ງານ",
          icon: "ph:user-plus",
          to: "/users",
        },
        
      ],
    },
    {
      title: "ຕັ້ງຄ່າທຳນຽມ",
      icon: "carbon:service-id",
      to: "/users",
    },
  
  ];
  