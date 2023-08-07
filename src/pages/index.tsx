import prisma from '../lib/prisma';
import React, { useContext } from 'react'
import Router from 'next/router'
import { MappingContext } from '../context/context'
import Method from '@/components/Method';
import styles from '@/styles/Home.module.css';

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
      id: true,
      name: true,
      creator: true,
      description: true,
      activities: {
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
      patterns: {
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
              nameId: true,
            }
          },
          assignedWorkProducts: {
            select: {
              nameId: true,
              activityNameId: true,
            }
          },
        },
        where: {
          role: true,
        },
      }
    },
  });

  return {
    props: { nextId, methods },
    revalidate: 10,
  };
};

export default function Home({nextId, methods}) {
  const { setMethodId, setName, setCreator, setDescription, setTasks, setRoles } = useContext(MappingContext);

  const resetDatabase = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/delete/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const insertDatabase = async (e: React.SyntheticEvent) => {
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
    setCreator('');
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
    <div className={styles.container}>
      <h1>Method Essentilizer</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleCreate}>Create New Method</button>
        <button onClick={handleDelete}>Clear User Data</button>
        <button onClick={resetDatabase}>Reset Database</button>
        <button onClick={insertDatabase}>Insert Database</button>
      </div>
      <div className={styles.gridContainer}>
        {renderMethods()}
      </div>
    </div>
  );
}
