useEffect(() => {
  let mounted = true;
  async function initData() {
    const response = await Firebase.collectData(props.uid);
    if (!response) {
      const ref = base.syncState(props.uid, {
        context: {
          setState: () => createCsvObject(props.uid).then((data) => {
            dispatch({ type: 'loadSettings', payload: { playerData: data } });
          }),
          state: { response },
        },
        state: 'data',
      });
      return () => {
        base.removeBinding(ref);
      };
    }
    const ref = base.syncState(props.uid, {
      context: {
        setState: () => dispatch({ type: 'loadSettings', payload: { response } }),
        state: { response },
      },
      state: 'data',
    });
    return () => {
      base.removeBinding(ref);
    };
  }
  initData();

  return function cleanup() {
    mounted = false;
  };
}, [props.uid]);
