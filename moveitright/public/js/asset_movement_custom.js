frappe.ui.form.on("Asset Movement", {
    refresh(frm) {
        console.log("Current Workflow State:", frm.doc.workflow_state);

        if (frm.doc.rejection_reason) return;

        if (frm.last_shown_state === frm.doc.workflow_state) return;

        if (["HOD Rejected", "Asset Manager Rejected"].includes(frm.doc.workflow_state)) {
            frm.last_shown_state = frm.doc.workflow_state; // mark this state as shown
            show_reject_dialog(frm);
        }
    },
});

function show_reject_dialog(frm) {
    let d = new frappe.ui.Dialog({
        title: "Enter Rejection Reason",
        fields: [
            {
                label: "Reason",
                fieldname: "reason",
                fieldtype: "Small Text",
                reqd: 1
            }
        ],
        primary_action_label: "Save",
        primary_action(values) {
            frappe.call({
                method: "moveitright.api.custom_api.save_rejection_reason",
                args: {
                    docname: frm.doc.name,
                    reason: values.reason
                },
                callback: function(r) {
                    if (!r.exc) {
                        d.hide();
                        frappe.msgprint("Request has been Rejected.");
                        frm.reload_doc();
                    }
                }
            });
        }
    });
    d.show();
}
