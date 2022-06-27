import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CentreModal, SideModal } from '@project/components';
import { useModalReturn, useCentreModalReturn, useQueryModalReturn } from './types';

export const useModal = (isOpen?: boolean): useModalReturn => {
  const [_isOpen, setIsOpen] = useState(isOpen || false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return [_isOpen, closeModal, openModal];
};

export const useCentreModal = (isOpen?: boolean): useCentreModalReturn => {
  const [_isOpen, closeModal, openModal] = useModal(isOpen);

  return [CentreModal, _isOpen, closeModal, openModal];
};

export const useSideModal = (isOpen?: boolean): useCentreModalReturn => {
  const [_isOpen, closeModal, openModal] = useModal(isOpen);

  return [SideModal, _isOpen, closeModal, openModal];
};

export const useQueryCentreModal = (key: string, value?: string): useQueryModalReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [_isOpen, _closeModal, openModal] = useModal(false);

  const closeModal = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const hasQuery = searchParams.get(key);

    if (hasQuery) {
      if (value && hasQuery !== value) return;
      openModal();
    } else {
      _closeModal();
    }
  }, [searchParams]);

  return [CentreModal, _isOpen, closeModal];
};
