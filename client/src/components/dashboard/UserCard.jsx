import useAuthStore from '@/store/authStore';
import { Hand } from 'lucide-react';
import { useEffect } from 'react';

const UserCard = () => {
    const { user } = useAuthStore();

    return (
        <>
            <div className="col-md-3 rounded-4 user-card-container">
                <div className="px-1 py-2">
                    <h4 className='text-wrap text-secondary'>Hi, <span className='name-card-text'>{user ? user?.first_name + ' ' + user.last_name : 'Default User'}</span>
                    </h4>
                </div>
                <div className='px-1 py-2'>
                    
                </div>
            </div>
        </>
    )
}

export default UserCard;