$(function () {
   
  //  $('input[type="checkbox"], input[type="radio"], select.uniform, input[type="file"]').uniform();
    $(".editor").cleditor();
    $(".editor2").cleditor({
            controls: "image"
    });

 

    /*========= form validate =========*/
    $("#form1").validate({
        rules: {
            /*========= form validate for leads =========*/
            txtLeadname: "required",
            txtLeadcontactnumber: {
                require_from_group: [1, ".GroupLeads"],
                number: true
            },
            txtLeademail: {
                require_from_group: [1, ".GroupLeads"],
                email: true
            },
              txtLeadAddress: {
                require_from_group: [1, ".GroupLeads"]
            },
            cmbLeadddlleadSource: "required",
            txtage: {
                number : true
            },
            txtLeadIdNumber: { number: true },

            ddlAgentReassign: "required",

            /*========= form validate for donors =========*/
            txtDonorsname: "required",
            txtDonorscontactnumber: {
                require_from_group: [1, ".GroupDonor"],
                number: true
            },
            txtDonorsemail: {
                require_from_group: [1, ".GroupDonor"],
                email: true
            },
            cmbdonorleadsource: "required",
            txtDonorspassword: {
                required: true,
                minlength: 5
            },

            /*========= form validate for Adminmenu =========*/
            cmbParentmenu: "required",
            txtUrl: "required",
            txtOrder: "required",
            txtIconOrder: "required",

            /*========= form validate for content page(adding)=========*/
            txtContentpagename: "required",
            txtCoontentpageTitle:"required",
            txtContentpageUrl: "required",
            txtContentpageContentPageOrder: "required",

            /*========= form validate for content page(adding)=========*/
            txtEcardname: "required",
            txtEcardReference: "required",
            txtEcardTemplate: "required",
            txtEEcardDefault: "required",
            txtEcardDefaultMsg: "required",
            txtEcardDefaultfrom: "required",


            /*=========== Re-assign lead =======*/
            txtReason: "required",
            ddlNewAgent: "required",
            txtReassignReason : "required",
           
            /*======== Assign multiple leads*/
            ddlleadAgent: "required",

            /*========= form validate for Ecards page(adding)=========*/
            lblEcardCategory: "required",

            /*========= form validate for Admin Menu page(adding)=========*/
            txtAdminNameTitle: "required",
            txtAdminOrder: "required",

            /*========= form validate for donor userinfo page(adding)=========*/
            txtOverviewName: "required",
            txtOverviewPassword: "required",
            txtOverviewFname: "required",
            txtOverviewLname: "required",

            /*========= form validate for Bloodbank userinfo page(adding)=========*/
            txtDonorIDnumber: "required",
            cmbDonorBloodtype: "required",
            txtDonorRegistration: "required",

            /*========= form validate for Medical Info page(adding)=========*/
            txtuseinfoname: "required",
            txtuseinfoSurname: "required",
            txtuseinfoIdentificationNumber: "required",
            txtuseinfoKinTelephone: "required",
            txtuseinfoMedicalAidName: "required",
            txtuseinfoMedicalAidNumber: "required",

            /*========= form validate for site config page(adding)=========*/
            txtsiteTitle: "required",
            cbositeOrder: "required",
            txtTopname: "required",
            txtTopcontactnumber: "required",
            txtquickName: "required",
            cboquickorder: "required",

            /*========= form validate for Resource section page(adding)=========*/
            txtRSname: "required",
            txtRSurl: "required",
            cboRSOrder: "required",
            txtADname: "required",
            txtADurl: "required",
            cboADOrder: "required",

            message: "required",

            /*=============== form =================================*/
            txtDebitAccountNO:  { number : true },
            txtDebitBranchCode: "required",
            txtDebitStartDate: "required",
            txtDebitEndDate: "required"



        }
    });
   
   
});


