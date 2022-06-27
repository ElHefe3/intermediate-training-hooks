import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { ModalProps } from '../centre-modal';

export const SideModal: React.FC<ModalProps> = ({ children, isOpen, onClose, afterClose }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog open as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={afterClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex h-full items-center justify-end text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-300"
            enterFrom="opacity-0 w-0"
            enterTo="opacity-100 w-full"
            leave="ease-out duration-200"
            leaveFrom="opacity-100 w-full"
            leaveTo="opacity-0 w-0"
          >
            <Dialog.Panel className="w-full h-full max-w-2xl transform overflow-hidden rounded-l-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
