import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import SingleListingView from './SingleListingView';
import { getUserFavorites } from '@/app/actions/getUserFavorites';

const SingleListing = async ({ params }: { params: { listingId: string } }) => {
  const { listingId } = params;
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  const favorites = await getUserFavorites(currentUser?.id);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <SingleListingView
      listing={listing}
      currentUser={currentUser}
      favorites={favorites}
    />
  );
};

export default SingleListing;