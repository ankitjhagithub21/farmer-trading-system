import React from 'react'

const ViewModal = ({ farmer, onClose }) => {
  if (!farmer) return null


  return (
    <dialog id="modal_view" className="modal modal-open">
      <div className="modal-box max-w-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">Farmer Details</h3>

        <div className="flex items-center gap-3 mb-4">
          
          <div>
            <p className="font-semibold text-base">{farmer.name}</p>
            <p className="text-sm text-base-content/60">{farmer.mobile}</p>
          </div>
        </div>

        <div className="divider text-xs text-base-content/50 my-2">Personal</div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Father Name</p>
            <p className="font-medium">{farmer.fatherName || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Mobile</p>
            <p className="font-medium">{farmer.mobile || '-'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Address</p>
            <p className="font-medium">{farmer.address || '-'}</p>
          </div>
        </div>

        <div className="divider text-xs text-base-content/50 my-2">Transaction</div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Product</p>
            <p className="font-medium">{farmer.productName || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Weight</p>
            <p className="font-medium">{farmer.weight ? `${farmer.weight} kg` : '-'}</p>
          </div>
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Rate</p>
            <p className="font-medium">{farmer.rate ? `₹${farmer.rate}/kg` : '-'}</p>
          </div>
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Bags</p>
            <p className="font-medium">{farmer.bagQuantity || '-'}</p>
          </div>
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Material</p>
            <span className="badge badge-ghost badge-sm">{farmer.material || '-'}</span>
          </div>
          <div>
            <p className="text-xs text-base-content/50 uppercase tracking-wide mb-0.5">Status</p>
            <span className={`badge badge-sm ${farmer.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
              {farmer.status}
            </span>
          </div>
        </div>

        <div className="modal-action mt-4">
          <button className="btn btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  )
}

export default ViewModal