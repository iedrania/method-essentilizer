import prisma from '../lib/prisma';
import React, { useContext } from 'react'
import Router from 'next/router'
import { MappingContext } from '../context/context'
import Method from '@/components/Method';

export const getStaticProps: GetStaticProps = async () => {
  const latestMethod = await prisma.method.findFirst({
    orderBy: {
      id: 'desc',
    },
    select: {
      id: true,
    },
  });

  const nextId = latestMethod ? latestMethod.id + 1 : 1;

  const methods = await prisma.method.findMany({
    select: {
      name: true,
      description: true,
      tasks: {
        include: {
          areasOfConcern: {
            select: {
              id: true,
            }
          },
          activitySpaces: {
            select: {
              id: true,
            }
          },
          workProducts: {
            include: {
              alphas: {
                select: {
                  id: true,
                }
              },
            }
          }
        },
      },
      roles: {
        include: {
          areasOfConcern: {
            select: {
              id: true,
            }
          },
          competencies: {
            select: {
              id: true,
            }
          },
          performedTasks: {
            select: {
              id: true,
            }
          },
          assignedWorkProducts: {
            select: {
              id: true,
              taskId: true,
            }
          },
        }
      }
    },
  });

  return {
    props: { nextId, methods },
    revalidate: 10,
  };
};

export default function Home({nextId, methods}) {
  const { setMethodId, setName, setDescription, setTasks, setRoles } = useContext(MappingContext);

  const validateData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/post/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    setMethodId(nextId)
    setName('');
    setDescription('');
    setTasks([]);
    setRoles([]);
    Router.push('/input-method');
  };

  const renderMethods = () => {
    if (methods.length) {
      return methods.map((method) => (
        <Method key={method.id} method={method} nextId={nextId} />
      ));
    } else {
      return <p>No methods available.</p>
    }
  };

  return (
    <div>
      <h1>Method Essentilizer</h1>
      <button onClick={handleCreate}>Create New Method</button>
      <button onClick={handleDelete}>Clear Database</button>
      <button onClick={validateData}>Insert Database</button>
      <div>
        {renderMethods()}
      </div>
    </div>
  );
}
