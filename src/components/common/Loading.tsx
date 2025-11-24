'use client';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
}

const Loading = ({ size = 'medium' }: LoadingProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-black rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loading;